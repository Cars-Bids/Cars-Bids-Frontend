import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (startDate: Date, endDate: Date) => void;
    initialStartDate?: Date;
    initialEndDate?: Date;
    title?: string;
}

export function DateTimePickerModal({
                                        isOpen,
                                        onClose,
                                        onConfirm,
                                        initialStartDate,
                                        initialEndDate,
                                        title = "Auction start date & time"
                                    }: DateTimePickerModalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate || null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate || null);
    const [startTime, setStartTime] = useState("14:00");
    const [clickCount, setClickCount] = useState(0);

    // Generate time slots with 10-minute intervals
    const timeSlots = Array.from({ length: 144 }, (_, i) => {
        const hours = Math.floor(i / 6);
        const minutes = (i % 6) * 10;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });

    // Initialize time from initial date
    useEffect(() => {
        if (initialStartDate) {
            const hours = initialStartDate.getHours().toString().padStart(2, '0');
            const minutes = Math.floor(initialStartDate.getMinutes() / 10) * 10;
            setStartTime(`${hours}:${minutes.toString().padStart(2, '0')}`);
        }
        if (initialStartDate && initialEndDate) {
            setClickCount(2);
        } else if (initialStartDate) {
            setClickCount(1);
        }
    }, [initialStartDate, initialEndDate]);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        // Adjust for Monday as first day (0 = Sunday, 1 = Monday, etc.)
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const isDateInRange = (date: Date) => {
        if (!selectedStartDate || !selectedEndDate) return false;
        const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const startCompare = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate());
        const endCompare = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), selectedEndDate.getDate());
        return compareDate >= startCompare && compareDate <= endCompare;
    };

    const isDateSelected = (date: Date) => {
        if (selectedStartDate && isSameDay(date, selectedStartDate)) return 'start';
        if (selectedEndDate && isSameDay(date, selectedEndDate)) return 'end';
        return false;
    };

    const isSameDay = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const handleDateClick = (day: number, monthOffset: number = 0) => {
        const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day);

        if (clickCount === 0) {
            // First click - set start date
            setSelectedStartDate(clickedDate);
            setSelectedEndDate(null);
            setClickCount(1);
        } else if (clickCount === 1) {
            // Second click - set end date
            if (clickedDate < selectedStartDate!) {
                // If clicked date is before start date, swap them
                setSelectedEndDate(selectedStartDate);
                setSelectedStartDate(clickedDate);
            } else {
                setSelectedEndDate(clickedDate);
            }
            setClickCount(2);
        } else {
            // Reset - start over with new start date
            setSelectedStartDate(clickedDate);
            setSelectedEndDate(null);
            setClickCount(1);
        }
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleSave = () => {
        if (!selectedStartDate) return;

        const [hours, minutes] = startTime.split(':').map(Number);

        const finalStartDate = new Date(selectedStartDate);
        finalStartDate.setHours(hours, minutes, 0, 0);

        let finalEndDate: Date;
        if (selectedEndDate) {
            finalEndDate = new Date(selectedEndDate);
            finalEndDate.setHours(hours, minutes, 0, 0);
        } else {
            finalEndDate = new Date(finalStartDate.getTime() + 60 * 60 * 1000);
        }

        onConfirm(finalStartDate, finalEndDate);
        onClose();
    };

    const renderCalendarWeek = (startDay: number, monthOffset: number = 0) => {
        const week = [];
        const targetMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset);
        const daysInTargetMonth = getDaysInMonth(targetMonth);
        let hasRange = false;
        let rangeStart = -1;
        let rangeEnd = -1;

        // First pass: determine if week has range and find start/end positions
        for (let i = 0; i < 7; i++) {
            const day = startDay + i;
            let actualDay = day;
            let actualMonthOffset = monthOffset;

            // Handle month boundaries
            if (monthOffset === 0) {
                if (day <= 0) {
                    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0);
                    actualDay = prevMonth.getDate() + day;
                    actualMonthOffset = -1;
                } else if (day > daysInTargetMonth) {
                    actualDay = day - daysInTargetMonth;
                    actualMonthOffset = 1;
                }
            }

            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + actualMonthOffset, actualDay);
            const isInRange = isDateInRange(date);
            const selectedType = isDateSelected(date);

            if (selectedType || isInRange) {
                hasRange = true;
                if (rangeStart === -1) rangeStart = i;
                rangeEnd = i;
            }
        }

        // Second pass: render the dates
        for (let i = 0; i < 7; i++) {
            const day = startDay + i;
            let actualDay = day;
            let actualMonthOffset = monthOffset;
            let isOtherMonth = false;

            // Handle month boundaries
            if (monthOffset === 0) {
                if (day <= 0) {
                    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0);
                    actualDay = prevMonth.getDate() + day;
                    actualMonthOffset = -1;
                    isOtherMonth = true;
                } else if (day > daysInTargetMonth) {
                    actualDay = day - daysInTargetMonth;
                    actualMonthOffset = 1;
                    isOtherMonth = true;
                }
            }

            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + actualMonthOffset, actualDay);
            const isInRange = isDateInRange(date);
            const selectedType = isDateSelected(date);

            let className = "w-[18px] cursor-pointer flex items-center justify-center relative z-10";

            if (selectedType === 'start') {
                className += " text-white rounded-l-md";
            } else if (selectedType === 'end') {
                className += " text-white rounded-r-md";
            } else if (isInRange) {
                className += " text-white";
            } else if (isOtherMonth) {
                className += " text-[#d0d0d0]";
            } else {
                className += " text-white hover:bg-gray-700";
            }

            week.push(
                <div
                    key={`${actualMonthOffset}-${actualDay}`}
                    className={className}
                    onClick={() => handleDateClick(actualDay, actualMonthOffset)}
                >
                    {actualDay}
                </div>
            );
        }

        // Calculate background width and position
        let backgroundStyle = {};
        if (hasRange && rangeStart !== -1 && rangeEnd !== -1) {
            const cellWidth = 18; // w-[18px]
            const gapWidth = 8; // gap-2 = 0.5rem = 8px
            const startOffset = rangeStart * (cellWidth + gapWidth);
            const rangeWidth = (rangeEnd - rangeStart + 1) * cellWidth + (rangeEnd - rangeStart) * gapWidth;

            backgroundStyle = {
                left: `${startOffset}px`,
                width: `${rangeWidth}px`
            };
        }

        return (
            <div className="flex gap-2 justify-center font-medium font-synonym text-center text-xs relative">
                {hasRange && (
                    <div
                        className="absolute inset-y-0 bg-[#ce2023] rounded-md z-0"
                        style={backgroundStyle}
                    />
                )}
                {week}
            </div>
        );
    };

    const renderCalendar = () => {
        const firstDay = getFirstDayOfMonth(currentMonth);
        const weeks = [];

        let currentWeekStart = 1 - firstDay; // Start from previous month if needed

        // Generate 6 weeks to fill the calendar
        for (let week = 0; week < 6; week++) {
            weeks.push(
                <div key={week} className="flex justify-center font-medium font-synonym text-center text-xs">
                    {renderCalendarWeek(currentWeekStart)}
                </div>
            );
            currentWeekStart += 7;
        }

        return weeks;
    };

    // Get day part (AM/PM) for display
    const getDayPart = (timeString: string) => {
        const [hours] = timeString.split(':').map(Number);
        return hours >= 12 ? 'PM' : 'AM';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.76)] flex items-center justify-center z-50">
            <div className="bg-[#121212] border-2 border-[#ce2023] rounded-lg w-1/3 flex flex-col justify-around gap-8 p-10">

                {/* Header - Icon and Close */}
                <div className="relative flex justify-center items-center">
                    <div className="flex justify-center">
                        <svg width="58" height="39" viewBox="0 0 382 258" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M381.622 258H319.304L226.556 150.54H84.8291V107.26H296.377C302.63 106.838 308.466 105.36 313.259 103.249C318.262 101.349 323.055 98.393 327.015 94.5928C327.64 94.1706 328.057 93.5372 328.474 92.9038C332.017 89.3148 334.518 85.3035 335.977 81.0811C338.27 74.7475 339.312 69.2584 339.312 63.347V56.8023C339.312 53.2132 338.27 50.6798 337.853 50.0464C337.228 48.1463 335.977 46.4574 334.518 45.6129C333.268 44.5573 331.392 43.7128 329.933 43.7128H328.266C328.266 43.7128 327.015 43.5017 326.39 43.5017H169.657V0.433105H326.39C336.811 0.433105 345.356 2.33319 352.234 5.92224C359.737 9.93352 365.156 14.5782 369.533 20.0673C373.91 25.9787 377.036 32.1012 378.704 38.2237C380.788 44.5573 381.622 50.6798 381.622 56.5911V63.347C381.622 73.2696 380.371 82.3478 378.079 90.5815L377.662 92.0594C374.744 101.138 371.409 108.316 367.241 114.227C361.822 121.405 357.028 126.472 351.817 130.694C346.19 134.917 340.146 138.928 333.476 142.095C326.39 145.262 320.346 147.162 314.093 148.217C308.257 149.695 302.213 150.54 296.169 150.54H290.125L381.83 258H381.622Z" fill="#EC2729"/>
                            <path d="M237.392 214.931V258H64.1939C57.7328 258 50.8549 256.733 43.1433 254.411C35.8485 252.3 28.7622 248.5 22.5096 243.433C16.0485 238.155 10.6295 231.399 6.46108 223.165C2.08422 214.931 0 204.798 0 192.764V56.5911C0 50.4686 1.04211 44.3461 3.12633 38.2237C4.7937 32.1012 7.92003 25.9787 12.2969 20.0673C16.6737 14.5782 22.0927 9.93352 29.5959 5.92224C36.2654 2.33319 45.0191 0.433105 55.2318 0.433105H127.137V43.5017H53.356C53.356 43.5017 52.3139 43.7128 51.897 43.7128C50.2297 43.7128 48.3539 44.5573 47.3117 45.4018C45.6444 46.4574 44.6023 47.9352 43.977 49.6242C42.9349 51.5242 42.3096 54.2688 42.3096 56.8023V192.764C42.518 199.731 44.3938 205.22 48.1454 209.02C51.897 213.031 57.5244 214.931 64.4023 214.931H237.392Z" fill="#DEDEDE"/>
                        </svg>
                    </div>
                    <button onClick={onClose} className="text-[#d0d0d0] absolute right-0 hover:text-white">
                        <X />
                    </button>
                </div>

                {/* Title */}
                <div className="text-center">
                    <h2 className="text-white font-amulya font-bold text-2xl">{title}</h2>
                </div>

                {/* Calendar and Time Panels */}
                <div className="flex gap-8 justify-center items-stretch">
                    {/* Calendar Panel */}
                    <div className="flex-1 max-w-min border border-[#ce2023] flex flex-col gap-4.5 rounded-md p-2 bg-[#2c2c2c]">
                        <div className="flex items-center justify-between">
                            <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-600 rounded">
                                <ChevronLeft className="w-4 h-4 text-white" />
                            </button>
                            <h3 className="text-white font-synonym font-medium text-xs">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button onClick={handleNextMonth} className="p-1 hover:bg-gray-600 rounded">
                                <ChevronRight className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Calendar */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2 justify-center">
                                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                    <div key={day} className="text-xs flex items-center justify-center font-synonym w-[18px] text-white font-medium">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar days */}
                            <div className="flex flex-col gap-2 justify-between">
                                {renderCalendar()}
                            </div>
                        </div>
                    </div>

                    {/* Time Panel */}
                    <div className="min-w-[192px] max-w-min border border-[#ce2023] flex flex-col gap-3 rounded-md p-2 bg-[#2c2c2c]">
                        <div className="text-center pb-1.5 border-b border-[#ce2023] flex justify-center gap-2 font-synonym font-medium text-xs text-white">
                            <span>{startTime}</span>
                            <span>{getDayPart(startTime)}</span>
                        </div>

                        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto font-synonym font-medium text-xs text-white">
                            {timeSlots.map(time => {
                                const [hoursStr, minutesStr] = time.split(':');
                                let hours = parseInt(hoursStr);
                                const minutes = minutesStr;
                                const period = hours >= 12 ? 'PM' : 'AM';
                                hours = hours % 12;
                                if (hours === 0) hours = 12; // 0 -> 12 AM/PM
                                const displayTime = `${hours.toString().padStart(2, '0')}:${minutes}`;

                                return (
                                    <div
                                        key={time}
                                        onClick={() => setStartTime(time)}
                                        className={`flex justify-start cursor-pointer transition-colors text-xs px-2 gap-2 rounded-md hover:bg-[#121212] ${
                                            startTime === time ? 'bg-[#212121] text-white' : 'text-white'
                                        }`}
                                    >
                                        <span>{displayTime}</span>
                                        <span>{period}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSave}
                        disabled={!selectedStartDate}
                        className="px-7.5 py-2.5 bg-transparent border-2 border-[#ce2023] text-white rounded-md hover:bg-[#ce2023] hover:text-white transition-colors font-bold font-amulya"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}