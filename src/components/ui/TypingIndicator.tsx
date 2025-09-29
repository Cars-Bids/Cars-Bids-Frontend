import { useChatSignalR } from "@/features/signalr/ChatSignalRProvider";

export default function TypingIndicator() {
    const { typingUsers } = useChatSignalR();

    if (typingUsers.length === 0) return null;

    const getTypingText = () => {
        if (typingUsers.length === 1) {
            const username = typingUsers[0].username || `User ${typingUsers[0].userId}`;
            return `${username} is typing`;
        } else if (typingUsers.length === 2) {
            const user1 = typingUsers[0].username || `User ${typingUsers[0].userId}`;
            const user2 = typingUsers[1].username || `User ${typingUsers[1].userId}`;
            return `${user1} and ${user2} are typing`;
        } else {
            const firstName = typingUsers[0].username || `User ${typingUsers[0].userId}`;
            const remainingCount = typingUsers.length - 1;
            return `${firstName} and ${remainingCount} other${remainingCount > 1 ? 's' : ''} are typing`;
        }
    };

    return (
        <div className="px-3 py-2 text-gray-400 text-sm flex items-center gap-2">
            <span className="font-synonym">{getTypingText()}</span>
            <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
}