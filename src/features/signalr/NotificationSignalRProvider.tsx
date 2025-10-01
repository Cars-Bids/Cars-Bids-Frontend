import {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import conf from "@/app/conf/basic.conf.json";
import { getAccessToken } from "@/features/api/Auth/authService";
import {type BaseNotification, mapNotification, NotificationSource} from "../Notifications/NotificationMapper";
import {useMarkNotificationReadMutation} from "@/features/api/endpoints/Notification.ts";

interface NotificationHubContextValue {
    connection: HubConnection | null;
    notifications: BaseNotification[];
    markAsRead: (id: number) => void;
    clearAll: () => void;
}

const NotificationHubContext = createContext<NotificationHubContextValue>({
    connection: null,
    notifications: [],
    markAsRead: () => {},
    clearAll: () => {},
});

function normalizeSource(source: number | string): NotificationSource {
    if (typeof source === "number") {
        return source as NotificationSource;
    }

    switch (source) {
        case "Outbid":
        case "Auction":
            return NotificationSource.Auction;
        case "AuctionComment":
            return NotificationSource.AuctionComment;
        default:
            throw new Error(`Unknown notification source: ${source}`);
    }
}

export const useNotificationHub = () => useContext(NotificationHubContext);

export const NotificationSignalRProvider = ({ children }: { children: React.ReactNode }) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [notifications, setNotifications] = useState<BaseNotification[]>([]);
    const token = getAccessToken();
    const [markNotificationRead] = useMarkNotificationReadMutation();

    useEffect(() => {
        if (!token) {
            console.log("❌ User not authorized, not connecting to NotificationHub");
            return;
        }

        const conn = new HubConnectionBuilder()
            .withUrl(`${conf.hubUrl}/notifications`, {
                accessTokenFactory: () => token,
            })
            .withAutomaticReconnect()
            .build();

        conn.start()
            .then(() => console.log("✅ Connected to NotificationHub"))
            .catch(err => console.error("❌ NotificationHub connection failed:", err));

        conn.on("UnreadNotifications", (notifications: any[]) => {
            console.log("🔔 Unread notifications", notifications);

            const mapped = notifications.map(dto => {
                const normSource = normalizeSource(dto.typeKey);
                return mapNotification(normSource, dto);
            });

            console.log("Mapped data:", mapped);

            setNotifications(prev => [...mapped, ...prev]);
        });


        conn.on("ReceiveNotification", (source: number | string, payload: any) => {
            console.log("📩 New notification", source, payload);
            const normSource = normalizeSource(source);
            const mapped = mapNotification(normSource, payload);
            console.log(mapped);
            setNotifications(prev => [mapped, ...prev]);
        });

        setConnection(conn);

        return () => {
            conn.stop();
            setConnection(null);
            setNotifications([]);
        };
    }, [token]);

    const markAsRead = async (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        await markNotificationRead(id).unwrap();
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const value = useMemo(
        () => ({ connection, notifications, markAsRead, clearAll }),
        [connection, notifications]
    );

    return (
        <NotificationHubContext.Provider value={value}>
            {children}
        </NotificationHubContext.Provider>
    );
};