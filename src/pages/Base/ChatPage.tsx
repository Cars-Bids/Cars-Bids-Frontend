import {Button} from "@/components/ui/button.tsx";
import type { ChatMessageDto } from "@/features/types/Chat";
import {Paperclip, Smile} from "lucide-react";
import ChatMessage from "@/components/ui/ChatMessage.tsx";

const mockRequiredInfo = [
    "Add service history.",
    "Add knowing flaws.",
    "Need additional equipment info.",
    "Add more exterior photos.",
];

const currentUserId = 1;

const mockMessages: ChatMessageDto[] = Array.from({ length: 30 }).map(
    (_, i) => ({
        id: i + 1,
        chatId: 100,
        senderId: i % 2 === 0 ? currentUserId : 2,
        message: `Тестове повідомлення №${i + 1}`,
        sentAt: new Date(Date.now() - i * 60000),
        seenBy: [
            { userId: 1, seenAt: new Date() },
            { userId: 2, seenAt: new Date() },
        ],
    })
);

export default function ChatPage() {
    return (
        <main className="w-2/3 mx-auto flex gap-[12px] h-[720px] pb-16 pt-5">
            {/* Left panel */}
            <aside className="w-1/4 h-1/3 flex flex-col rounded-md bg-[#212121]">
                {/* Header */}
                <div className="flex items-center px-3 py-2.5 border-b border-white">
                    <h2 className="text-lg font-bold font-amulya text-white">Required information</h2>
                </div>

                {/* Content */}
                <div className="flex-1 p-2.5 overflow-y-auto">
                    <ul className="flex flex-col gap-3">
                        {mockRequiredInfo.map((item, index) => (
                            <li
                                key={index}
                                className="text-base font-medium font-amulya text-white"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Chat panel */}
            <section className="w-3/4 flex flex-col rounded-md bg-[#212121]">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-white">
                    <span className="font-amulya font-bold text-lg text-white">
                        2022 Porsche 911 Turbo S Coupe
                    </span>
                    <span className="text-base font-synonym font-medium text-white">
                        Working manager: <span className="font-amulya font-bold ml-3">Alik</span>
                    </span>
                </div>

                {/* Messages */}
                <div className="h-full flex flex-col gap-2.5 px-3 overflow-y-auto">
                    {mockMessages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} currentUserId={currentUserId} />
                    ))}
                </div>

                {/* Functional panel */}
                <div className="px-3 flex items-center gap-4 h-[60px]">
                    <div className="flex-9/10 flex items-center bg-[#2c2c2c] rounded-md px-3 py-1.5 gap-6">
                        {/* Photo button */}
                        <button>
                            <Paperclip size={20} className="text-[#d0d0d0]"/>
                        </button>
                        {/* Input field */}
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="flex-1 bg-transparent text-white outline-none placeholder-[#d0d0d0] font-amulya font-medium text-base"
                        />
                        <button>
                            <Smile size={20} className="text-[#d0d0d0]"/>
                        </button>
                    </div>
                    <Button className="flex-1/10 font-amulya font-bold rounded-md px-[30px] py-[10px] bg-white text-[#212121]">
                        Send
                    </Button>
                </div>
            </section>
        </main>
    );
}
