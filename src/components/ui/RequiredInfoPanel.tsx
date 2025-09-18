import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
    useAddRequirementMutation,
    useDeleteRequirementMutation,
    useGetChatRequirementsQuery
} from "@/features/api/endpoints/Chat";

interface Props {
    chatId: number;
    isManager: boolean;
}

export default function RequiredInfoPanel({ chatId, isManager }: Props) {
    const { data: requirements, isLoading } = useGetChatRequirementsQuery(chatId);
    const [addRequirement] = useAddRequirementMutation();
    const [deleteRequirement] = useDeleteRequirementMutation();

    const [newRequirement, setNewRequirement] = useState("");

    const handleAdd = async () => {
        if (!newRequirement.trim()) return;
        await addRequirement({ chatId, text: newRequirement });
        setNewRequirement("");
    };

    const handleDelete = async (id: number) => {
        await deleteRequirement({ chatId, id });
    };

    return (
        <aside className="w-1/4 h-full flex flex-col rounded-md ">
            <div className="flex items-center px-3 py-2.5 border-b border-white bg-[#212121]">
                <h2 className="text-lg font-bold font-amulya text-white">
                    Required information
                </h2>
            </div>

            <div className="p-2.5 h-1/4 overflow-y-auto bg-[#212121]">
                {isLoading ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {requirements?.map((item) => (
                            <li
                                key={item.id}
                                className="text-base font-medium font-amulya text-white flex items-center justify-between group"
                            >
                                <span>{item.text}</span>
                                {isManager && (
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} className="text-red-500" />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isManager && (
                <div className="flex rounded-md p-2.5 items-center justify-between bg-[#212121] mt-3 gap-2.5">
                    <input
                        type="text"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="Type an information"
                        className="p-2 text-white bg-[#2c2c2c] rounded-md focus:outline-none"
                        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    />
                    <Button
                        onClick={handleAdd}
                        disabled={!newRequirement.trim()}
                        className="font-amulya font-bold text-sm rounded-md px-[8px] py-[16px] bg-white text-[#212121]"
                    >
                        Send
                    </Button>
                </div>
            )}
        </aside>
    );
}
