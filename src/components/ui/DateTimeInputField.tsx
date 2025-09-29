import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import {DateTimePickerModal} from "@/components/Main/Modal/CreateCar/DateTimePickerModal.tsx";

interface DateTimeInputFieldProps {
    label: string;
    value?: Date;
    onChange: (date: Date) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function DateTimeInputField({
                                       label,
                                       value,
                                       onChange,
                                       placeholder = "Select date & time",
                                       className = "",
                                       disabled = false
                                   }: DateTimeInputFieldProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDateTime = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const handleConfirm = (startDate: Date) => {
        onChange(startDate);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex flex-col">
                <span className="font-amulya font-bold text-lg text-white mb-2">{label}</span>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    disabled={disabled}
                    className={`
                        flex items-center justify-between px-3 py-2 
                        bg-[#2c2c2c] text-white border border-[#d0d0d0] 
                        rounded focus:border-red-500 transition-colors
                        hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed
                        ${className}
                    `}
                >
                    <span className="flex items-center gap-2">
                        <Calendar className="w-6" />
                        <Clock className="w-6" />
                        {value ? formatDateTime(value) : placeholder}
                    </span>
                </button>
            </div>

            <DateTimePickerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                initialStartDate={value}
                initialEndDate={value ? new Date(value.getTime() + 60 * 60 * 1000) : undefined}
            />
        </>
    );
}

// Component for date range selection
interface DateTimeRangeInputProps {
    startLabel: string;
    endLabel: string;
    startValue?: Date;
    endValue?: Date;
    onStartChange: (date: Date) => void;
    onEndChange: (date: Date) => void;
    className?: string;
    disabled?: boolean;
}

export function DateTimeRangeInput({
                                       startLabel,
                                       endLabel,
                                       startValue,
                                       endValue,
                                       onStartChange,
                                       onEndChange,
                                       className = "",
                                       disabled = false
                                   }: DateTimeRangeInputProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDateTime = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDateTimeShort = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour12: false
        });
    };

    const handleConfirm = (startDate: Date, endDate: Date) => {
        onStartChange(startDate);
        onEndChange(endDate);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-2 grid-rows-2 gap-2.5 items-center">
                <span className="font-amulya font-bold text-lg">{startLabel}</span>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    disabled={disabled}
                    className={`
                        flex items-center justify-start px-2 py-1 transition-colors
                        ${className}
                    `}
                >
                    <Calendar className="h-8 w-8 mr-2 p-1 rounded-[10px] text-white bg-[#ce2023]" />
                    {startValue ? formatDateTime(startValue) : "Select start"}
                </button>

                <span className="font-amulya font-bold text-lg">{endLabel}</span>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    disabled={disabled}
                    className={`
                        flex items-center justify-start px-2 py-1
                        transition-colors
                        ${className}
                    `}
                >
                    <Calendar className="h-8 w-8 mr-2 p-1 text-white rounded-[10px] bg-[#ce2023]" />
                    {endValue ? formatDateTimeShort(endValue) : "Select end"}
                </button>
            </div>

            <DateTimePickerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                initialStartDate={startValue}
                initialEndDate={endValue}
            />
        </>
    );
}