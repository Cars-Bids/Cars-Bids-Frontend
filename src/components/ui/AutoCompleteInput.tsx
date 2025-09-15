import { useState, useMemo, useEffect, useRef } from "react";
import { useField, ErrorMessage } from "formik";

type Option = { id: number; name: string };

type Props = {
    label: string;
    name: string;
    options?: Option[];
    asyncOptions?: Option[];
    placeholder?: string;
    filterByMakeId?: number | null;
};

export function AutoCompleteInput({
                                      label,
                                      name,
                                      options = [],
                                      asyncOptions = [],
                                      placeholder,
                                      filterByMakeId,
                                  }: Props) {
    const [field, meta, helpers] = useField(name);
    const [query, setQuery] = useState(field.value ? String(field.value) : "");
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() => {
        let result = options.length > 0 ? options : asyncOptions;
        if (filterByMakeId) {
            result = result.filter((o: any) => o.makeId === filterByMakeId);
        }
        if (query.length > 0) {
            result = result.filter((o) =>
                o.name.toLowerCase().includes(query.toLowerCase())
            );
        }
        return result;
    }, [options, asyncOptions, query, filterByMakeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        helpers.setValue(""); // поки не вибрано
        setShowDropdown(true);
    };

    const handleSelect = (opt: Option) => {
        setQuery(opt.name);
        helpers.setValue(opt.id);
        setShowDropdown(false);
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
        <div className="flex flex-col relative" ref={wrapperRef}>
            <label htmlFor={name} className="block text-xl font-medium font-amulya mb-1">
                {label}
            </label>
            <input
                id={name}
                type="text"
                value={query}
                onChange={handleChange}
                onBlur={field.onBlur}
                placeholder={placeholder}
                className={`mt-1 p-2 w-full border rounded-md placeholder-[#d0d0d0] ${
                    meta.touched && meta.error ? "border-red-500" : "border-[#d0d0d0]"
                }`}
            />
            {showDropdown && filteredOptions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-[#2c2c2c] border border-[#d0d0d0] rounded-md shadow-md max-h-48 overflow-y-auto z-10">
                    {filteredOptions.map((opt) => (
                        <li
                            key={opt.id}
                            onClick={() => handleSelect(opt)}
                            className="p-2 hover:bg-[#1c1c1c] cursor-pointer"
                        >
                            {opt.name}
                        </li>
                    ))}
                </ul>
            )}
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-sm font-synonym mt-1"
            />
        </div>
    );
}
