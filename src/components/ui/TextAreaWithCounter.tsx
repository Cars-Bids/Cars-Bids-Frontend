import { useField, ErrorMessage } from "formik";
import { useRef, useEffect } from "react";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    maxLength?: number;
    minRows?: number;
    maxRows?: number;
};

export function TextareaWithCounter({
                                        name,
                                        label,
                                        placeholder,
                                        maxLength = 180,
                                        minRows = 1,
                                        maxRows = 10
                                    }: Props) {
    const [field, meta, helpers] = useField(name);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            helpers.setValue(value);
        }
    };

    const autoResize = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height to calculate scroll height properly
        textarea.style.height = 'auto';

        // Calculate line height
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
        const minHeight = lineHeight * minRows;
        const maxHeight = lineHeight * maxRows;

        // Set new height based on scroll height, constrained by min/max
        const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
        textarea.style.height = `${newHeight}px`;

        // Show/hide scrollbar based on whether content exceeds max height
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    // Auto-resize when content changes
    useEffect(() => {
        autoResize();
    }, [field.value]);

    // Auto-resize on window resize
    useEffect(() => {
        const handleResize = () => autoResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col mt-4 space-y-1">
            <label htmlFor={name} className="block text-xl font-medium font-amulya">
                {label}
            </label>
            <textarea
                {...field}
                ref={textareaRef}
                id={name}
                placeholder={placeholder}
                value={field.value || ""}
                onChange={handleChange}
                onInput={autoResize}
                style={{
                    resize: 'none',
                    minHeight: `${minRows * 20}px` // Fallback for line height calculation
                }}
                className={`p-2.5 w-full border rounded-md font-synonym dark:placeholder-[#d0d0d0] transition-all duration-200 focus:outline-none ${
                    meta.touched && meta.error ? "border-red-500" : "dark:border-[#d0d0d0] border-[#121212]"
                }`}
            />
            <div className="flex justify-between items-center">
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm font-synonym" />
                <span className="font-medium text-xs font-synonym darkL:text-white">
                    {(field.value?.length || 0)} / {maxLength}
                </span>
            </div>
        </div>
    );
}