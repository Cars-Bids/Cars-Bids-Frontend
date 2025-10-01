import React, {useEffect, useMemo, useRef, useState} from "react";
import { Bell, ChevronDown, MessageCircle, AlertTriangle, User } from "lucide-react";
import {useNotificationHub} from "@/features/signalr/NotificationSignalRProvider.tsx";
import type {BaseNotification} from "@/features/Notifications/NotificationMapper.ts";
import Icon from '@mdi/react';
import { mdiAlertOctagram } from '@mdi/js';
import ReactMarkdown from "react-markdown";
import {Links} from "@/components/Main/Links";

const GROUP_ICONS: Record<string, React.ReactNode> = {
    "Outbid": <Icon path={mdiAlertOctagram} className="text-[#ce2023]" size={1.4}/>,  // <- додав
    "Аукціони": <Icon path={mdiAlertOctagram} size={1}/>,
    "Коментарі": <MessageCircle className="w-5 h-5" />,
    "Comments": <MessageCircle className="w-5 h-5" />,  // <- додав англійську версію
    "Система": <AlertTriangle className="w-5 h-5" />,
    "Інші": <User className="w-5 h-5" />,
    "Other": <User className="w-5 h-5" />,  // <- додав англійську версію
};

export default function NotificationPopup() {
    const { notifications, markAsRead } = useNotificationHub();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const groups = useMemo(() => {
        const acc: Record<string, BaseNotification[]> = {};
        notifications.forEach(n => {
            const g = n.group || "Others";
            acc[g] = acc[g] || [];
            acc[g].push(n);
        });
        Object.keys(acc).forEach(key => {
            acc[key].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        });
        return acc;
    }, [notifications]);

    const toggleGroup = (g: string) => setExpanded(prev => ({ ...prev, [g]: !prev[g] }));

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setOpen(v => !v)}
                className="p-2 rounded-lg text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Notifications"
            >
                <Bell className="w-6 h-6" />
            </button>
            {open && (
                <div
                    className="absolute right-0 mt-8 w-[20vw] min-h-[10vw] bg-white dark:bg-[#212121] rounded-md shadow-lg z-500"
                    style={{ transformOrigin: "top right" }}
                >
                    <div className="py-5 px-6 flex flex-col gap-[18px] space-y-3 max-h-[40vw] overflow-auto">
                        {Object.keys(groups).length === 0 && (
                            <div className="text-center text-sm text-gray-500 py-8">No notifications</div>
                        )}
                        {Object.entries(groups).map(([group, items]) => {
                            const isExpanded = !!expanded[group];
                            return (
                                <div key={group} className="flex flex-col gap-4.5 text-black dark:text-white">
                                    <button
                                        onClick={() => toggleGroup(group)}
                                        className="w-full flex items-center justify-between gap-4.5"
                                        aria-expanded={isExpanded}
                                    >
                                        {GROUP_ICONS[group]}
                                        <div className="flex items-center gap-3 justify-between w-full font-amulya">
                                            <div className="flex gap-1 w-full justify-between">
                                                <div className="font-bold font-amulya">{items[0].title}</div>
                                                <div className="font-medium font-amulya">+{items.length}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ChevronDown className={`w-6 h-6 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                            </div>
                                        </div>
                                    </button>
                                    {isExpanded && (
                                        <div className="px-3 py-2 space-y-2 text-black dark:text-white">
                                            {items.map(item => (
                                                <div
                                                    key={item.id}
                                                    className={`flex items-start gap-2 pl-3 hover:bg-[#c0c0c0] hover:dark:bg-[#181818]`}
                                                >
                                                    <Links
                                                        to={item.link}
                                                        onClick={ () => markAsRead(item.notificationId)}
                                                        className="block flex-col gap-1 text-sm font-medium font-synonym"
                                                    >
                                                        <ReactMarkdown>
                                                            {item.description}
                                                        </ReactMarkdown>
                                                        <div className="text-xs text-[#a0a0a0]">
                                                            {new Date(item.createdAt).toLocaleString()}
                                                        </div>
                                                    </Links>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
