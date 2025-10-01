export enum NotificationSource {
    Auction = 0,  // <- виправив на OutBid
    AuctionComment = 1,
}

export interface BaseNotification {
    id: number;
    group: string;
    title: string;
    description: string;
    link: string;
    createdAt: string;
    isRead: boolean;
    notificationId: number;
}

export interface AuctionData {
    AuctionId: number;
    AuctionTitle: string;
}

export interface AuctionCommentData {
    auctionId: number;
    commentId: number;
    author: string;
    createdAt: string;
    isRead: boolean;
    id: number;
}

export function mapNotification(
    source: NotificationSource,
    dto: any
): BaseNotification {
    switch (source) {
        case NotificationSource.Auction: {
            const customData = typeof dto.customData === 'string'
                ? JSON.parse(dto.customData)
                : dto.customData;

            const auction = customData as AuctionData;
            console.log(auction);
            return {
                id: auction.AuctionId,
                group: "Outbid",
                title: "You have been outbid",
                description: `Your bid on the **${auction.AuctionTitle}** has been outbid!`,
                link: `/auction/${auction.AuctionId}`,
                createdAt: dto.createdAt,
                isRead: dto.isRead,
                notificationId: dto.id,
            };
        }

        case NotificationSource.AuctionComment: {
            const comment = dto as AuctionCommentData;
            return {
                id: comment.id,
                group: "Comments",
                title: "New comment",
                description: `**${comment.author}** left a comment on the auction`,
                link: `/auctions/${comment.auctionId}/comments#${comment.commentId}`,
                createdAt: comment.createdAt,
                isRead: comment.isRead,
            };
        }

        default:
            return {
                id: dto.id ?? Date.now(),
                group: "Other",
                title: "Notification",
                description: "New message",
                link: "/",
                createdAt: dto.createdAt ?? new Date().toISOString(),
                isRead: dto.isRead ?? false,
            };
    }
}