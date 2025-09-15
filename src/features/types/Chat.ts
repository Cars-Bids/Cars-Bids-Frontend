export type ChatMessageDto = {
    id: number;
    chatId: number;
    senderId: number;
    message?: string;
    sentAt: Date;
    attachment?: string[];
    seenBy?: SeenInfoDto[];
};

export type SeenInfoDto = {
    userId: number;
    seenAt: Date;
};