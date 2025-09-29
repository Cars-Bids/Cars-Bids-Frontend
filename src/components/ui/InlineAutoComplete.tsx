import { useState, useMemo, useEffect, useRef } from "react";
import { useField } from "formik";

type Option = { id: number; name: string; makeId?: number };

type InlineAutoCompleteProps = {
    name: string;
    options?: Option[];
    asyncOptions?: Option[];
    placeholder?: string;
    filterByMakeId?: number | null;
    className?: string;
    onLoadOptions?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
};

export function InlineAutoComplete({
                                       name,
                                       options = [],
                                       asyncOptions = [],
                                       placeholder,
                                       filterByMakeId,
                                       className = "",
                                       onLoadOptions,
                                       isLoading = false,
                                       disabled = false,
                                   }: InlineAutoCompleteProps) {
    const [field, meta, helpers] = useField(name);
    const [query, setQuery] = useState("");
    const [displayValue, setDisplayValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

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
        } else if (field.value === "" || field.value === null || field.value === undefined) {
            setDisplayValue("");
            setQuery("");
        }
    }, [field.value, options, asyncOptions]);

    const filteredOptions = useMemo(() => {
        let result = options.length > 0 ? options : asyncOptions;

        if (filterByMakeId) {
            result = result.filter((o: Option) => o.makeId === filterByMakeId);
        }

        if (query.length > 0) {
            result = result.filter((o) =>
                o.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        return result.slice(0, 10); // Limit results for performance
    }, [options, asyncOptions, query, filterByMakeId]);

    const handleFocus = () => {
        if (onLoadOptions && !isInitialized) {
            onLoadOptions();
        }
        setShowDropdown(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    };

    const handleBlur = () => {
        // Delay hiding dropdown to allow for click selection
        setTimeout(() => {
            setShowDropdown(false);
            // Reset display if no valid selection was made
            if (field.value !== undefined && field.value !== null && field.value !== "") {
                const allOptions = options.length > 0 ? options : asyncOptions;
                const selectedOption = allOptions.find(opt => opt.id === Number(field.value));
                if (selectedOption) {
                    setDisplayValue(selectedOption.name);
                    setQuery(selectedOption.name);
                }
            } else {
                setDisplayValue(query);
            }
        }, 150);
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

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                type="text"
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={isLoading ? "Loading..." : placeholder}
                disabled={disabled || isLoading}
                className={`w-full bg-transparent focus:outline-none ${className}`}
            />

            {showDropdown && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-[#2c2c2c] border border-[#d0d0d0] rounded-md shadow-lg max-h-48 overflow-y-auto z-50 mt-1">
                    {filteredOptions.map((opt) => (
                        <div
                            key={opt.id}
                            onMouseDown={(e) => {
                                e.preventDefault(); // Prevent blur from firing
                                handleSelect(opt);
                            }}
                            className="p-2 hover:bg-[#1c1c1c] cursor-pointer text-white font-synonym text-sm border-b border-[#404040] last:border-b-0"
                        >
                            {opt.name}
                        </div>
                    ))}
                </div>
            )}

            {meta.touched && meta.error && (
                <div className="absolute top-full left-0 text-red-500 text-xs mt-1">
                    {meta.error}
                </div>
            )}
        </div>
    );
}