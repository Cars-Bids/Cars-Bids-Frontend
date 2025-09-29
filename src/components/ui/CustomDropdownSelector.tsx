import { useState, useMemo, useEffect, useRef } from "react";
import { useField } from "formik";
import { ChevronDown } from "lucide-react";

type Option = { id: number; name: string; makeId?: number };

type CustomDropdownSelectorProps = {
    name: string;
    options?: Option[];
    asyncOptions?: Option[];
    placeholder?: string;
    filterByMakeId?: number | null;
    className?: string;
    dropdownClassName?: string;
    optionClassName?: string;
    chevronClassName?: string;
    onLoadOptions?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    showChevron?: boolean;
    allowSearch?: boolean;
};

export function CustomDropdownSelector({
                                           name,
                                           options = [],
                                           asyncOptions = [],
                                           placeholder = "Select option...",
                                           filterByMakeId,
                                           className = "",
                                           dropdownClassName = "",
                                           optionClassName = "",
                                           chevronClassName = "",
                                           onLoadOptions,
                                           isLoading = false,
                                           disabled = false,
                                           showChevron = true,
                                           allowSearch = true,
                                       }: CustomDropdownSelectorProps) {
    const [field, meta, helpers] = useField(name);
    const [query, setQuery] = useState("");
    const [displayValue, setDisplayValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initialize display value when field value or options change
    useEffect(() => {
        if (field.value !== undefined && field.value !== null && field.value !== "" && (options.length > 0 || asyncOptions.length > 0)) {
            const allOptions = options.length > 0 ? options : asyncOptions;
            const selectedOption = allOptions.find(opt => opt.id === Number(field.value));
            if (selectedOption) {
                setDisplayValue(selectedOption.name);
                setQuery(selectedOption.name);
                setIsInitialized(true);
            }
        } else if (field.value === "" || field.value === null || field.value === undefined || field.value === 0) {
            setDisplayValue("");
            setQuery("");
        }
    }, [field.value, options, asyncOptions]);

    const filteredOptions = useMemo(() => {
        let result = options.length > 0 ? options : asyncOptions;

        if (filterByMakeId) {
            result = result.filter((o: Option) => o.makeId === filterByMakeId);
        }

        if (allowSearch && query.length > 0) {
            result = result.filter((o) =>
                o.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        return result.slice(0, 10); // Limit results for performance
    }, [options, asyncOptions, query, filterByMakeId, allowSearch]);

    const handleFocus = () => {
        if (onLoadOptions && !isInitialized) {
            onLoadOptions();
        }
        setShowDropdown(true);
    };

    const handleInputClick = () => {
        if (disabled || isLoading) return;
        setShowDropdown(!showDropdown);
        if (inputRef.current && allowSearch) {
            inputRef.current.focus();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!allowSearch) return;

        const value = e.target.value;
        setQuery(value);
        setDisplayValue(value);

        // Clear the field value if user is typing (not selecting)
        if (!filteredOptions.some(opt => opt.name === value)) {
            helpers.setValue(null);
        }

        setShowDropdown(true);

        // Trigger load options if needed
        if (onLoadOptions && value.length >= 1 && !isInitialized) {
            onLoadOptions();
        }
    };

    const handleSelect = (opt: Option) => {
        setQuery(opt.name);
        setDisplayValue(opt.name);
        helpers.setValue(opt.id);
        setShowDropdown(false);
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleBlur = (e: React.FocusEvent) => {
        // Don't close if clicking on dropdown
        if (wrapperRef.current && wrapperRef.current.contains(e.relatedTarget as Node)) {
            return;
        }

        // Delay hiding dropdown to allow for click selection
        setTimeout(() => {
            setShowDropdown(false);
            // Reset display if no valid selection was made
            if (field.value !== undefined && field.value !== null && field.value !== "" && field.value !== 0) {
                const allOptions = options.length > 0 ? options : asyncOptions;
                const selectedOption = allOptions.find(opt => opt.id === Number(field.value));
                if (selectedOption) {
                    setDisplayValue(selectedOption.name);
                    setQuery(selectedOption.name);
                } else {
                    setDisplayValue("");
                    setQuery("");
                }
            } else {
                if (!allowSearch) {
                    setDisplayValue("");
                    setQuery("");
                }
            }
        }, 150);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && filteredOptions.length > 0) {
            e.preventDefault();
            handleSelect(filteredOptions[0]);
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const defaultDropdownClassName = "absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-50 mt-1";
    const defaultOptionClassName = "p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0";
    const defaultChevronClassName = "w-6 h-6 text-gray-400 transition-transform duration-200";

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div
                className={`relative flex items-center ${className}`}
                onClick={handleInputClick}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={displayValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={isLoading ? "Loading..." : placeholder}
                    disabled={disabled || isLoading}
                    readOnly={!allowSearch}
                    className="w-full bg-transparent focus:outline-none cursor-pointer placeholder:text-[#5c5c5c] dark:placeholder:text-[#d0d0d0]"
                />

                {showChevron && (
                    <ChevronDown
                        className={`${defaultChevronClassName} ${chevronClassName} ${
                            showDropdown ? 'rotate-180' : ''
                        }`}
                    />
                )}
            </div>

            {showDropdown && filteredOptions.length > 0 && (
                <div className={dropdownClassName || defaultDropdownClassName}>
                    {filteredOptions.map((opt) => (
                        <div
                            key={opt.id}
                            onMouseDown={(e) => {
                                e.preventDefault(); // Prevent blur from firing
                                handleSelect(opt);
                            }}
                            className={optionClassName || defaultOptionClassName}
                        >
                            {opt.name}
                        </div>
                    ))}
                </div>
            )}

            {showDropdown && filteredOptions.length === 0 && query.length > 0 && (
                <div className={dropdownClassName || defaultDropdownClassName}>
                    <div className={optionClassName || defaultOptionClassName}>
                        No options found
                    </div>
                </div>
            )}

            {meta.touched && meta.error && (
                <div className="absolute top-full left-0 text-red-500 text-xs mt-1 z-10">
                    {meta.error}
                </div>
            )}
        </div>
    );
}