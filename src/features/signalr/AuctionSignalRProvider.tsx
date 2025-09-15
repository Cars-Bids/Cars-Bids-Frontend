import {createContext, useContext, useEffect, useState} from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { AuctionsEndpoints } from "@/features/api/endpoints/Auction.ts";
import type { AppDispatch } from "@/app/store.ts";
import conf from "@/app/conf/basic.conf.json";
import {getAccessToken} from "@/features/api/Auth/authService.ts";
import type {AuctionDetailed} from "@/features/types/AuctionDetailed.ts";
import {message} from "antd";

interface AuctionSignalRContextValue {
    connection: HubConnection | null;
}

const AuctionSignalRContext = createContext<AuctionSignalRContextValue>({
    connection: null
});

export const useAuctionSignalR = () => useContext(AuctionSignalRContext);

interface Props {
    auctionId: number;
    children: React.ReactNode;
}

export const AuctionSignalRProvider = ({ auctionId, children }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    //const connectionRef = useRef<HubConnection | null>(null);
    const [currConnection, setCurrConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        // Закриваємо старе підключення, якщо є
        if (currConnection) {
            currConnection.stop();
            setCurrConnection(null);
        }

        const conn = new HubConnectionBuilder()
            .withUrl(`${conf.hubUrl}/auction?auctionId=${auctionId}`, {
                accessTokenFactory: () => getAccessToken() || ""
            })
            .withAutomaticReconnect()
            .build();

        conn.start()
            .then(() => {
                console.log(`SignalR connected for auction ${auctionId}`);
            })
            .catch(err => console.error("SignalR connection failed:", err));

        // Загальні події
        conn.on("NewBidReceived", (id: number, newPrice: number, bidder: string, endTime: Date) => {
            if (id !== auctionId) return;
            message.success(`Received new bid ${newPrice}$`);
            dispatch(
                AuctionsEndpoints.util.updateQueryData("getAuctionDetailedById", id, (draft: AuctionDetailed) => {
                    draft.auction.currentPrice = newPrice;
                    draft.auction.currentBidder = bidder;
                    draft.auction.endTime = endTime;
                    draft.auction.bidsCount++;
                })
            );
        });

        conn.on("BidPlaced", (id: number, newPrice: number, bidder: string, endTime: Date) => {
            if (id !== auctionId) return;
            message.success("Bid placed successfully!");
            dispatch(
                AuctionsEndpoints.util.updateQueryData("getAuctionDetailedById", id, (draft: AuctionDetailed) => {
                    draft.auction.currentPrice = newPrice;
                    draft.auction.currentBidder = bidder;
                    draft.auction.endTime = endTime;
                    draft.auction.bidsCount++;
                })
            );
        });

        conn.on("BidRejected", (reason: string) => {
            message.error(reason);
        });

        conn.on("AuctionConnected", (id: number, currentPrice: number, bidder: string, endTime: Date) => {
            if (id !== auctionId) return;
            dispatch(
                AuctionsEndpoints.util.updateQueryData("getAuctionDetailedById", id, (draft: AuctionDetailed) => {
                    draft.auction.currentPrice = currentPrice;
                    draft.auction.currentBidder = bidder;
                    draft.auction.endTime = endTime;
                })
            );
        });

        conn.on("AuctionStarted", (id: number, price: number, endTime: Date) => {
            if (id !== auctionId) return;
            message.success("Auction started");
            dispatch(
                AuctionsEndpoints.util.updateQueryData("getAuctionDetailedById", id, (draft: AuctionDetailed) => {
                    draft.auction.currentPrice = price;
                    draft.auction.endTime = endTime;
                    draft.auction.status = "Active";
                })
            );
        });

        conn.on("AuctionFinished", (id: number, finalPrice: number, winner: string, endTime: Date) => {
            if (id !== auctionId) return;
            message.success("Auction finished");
            dispatch(
                AuctionsEndpoints.util.updateQueryData("getAuctionDetailedById", id, (draft: AuctionDetailed) => {
                    draft.auction.currentPrice = finalPrice;
                    draft.auction.currentBidder = winner;
                    draft.auction.endTime = endTime;
                    draft.auction.status = winner == "no winner" ? "NotSold" : "Sold";
                })
            );
        });

        //connectionRef.current = conn;
        setCurrConnection(conn);

        return () => {
            conn.stop();
            setCurrConnection(null);
            //connectionRef.current = null;
            console.log(`SignalR disconnected for auction ${auctionId}`);
        };
    }, [auctionId, dispatch]);

    return (//connectionRef.current
        <AuctionSignalRContext.Provider value={{ connection: currConnection }}>
            {children}
        </AuctionSignalRContext.Provider>
    );
};
