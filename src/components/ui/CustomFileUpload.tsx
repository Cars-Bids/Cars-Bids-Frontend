import { useField, ErrorMessage } from "formik";
import { Upload } from "lucide-react";
import { useRef } from "react";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    maxFiles?: number;
    acceptedTypes?: string[];
    className?: string;
};

export function CustomFileUpload({
                                     name,
                                     label,
                                     placeholder = "Drag & drop your photos",
                                     maxFiles = 3,
                                     acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
                                     className = ""
                                 }: Props) {
    const [field, meta, helpers] = useField(name);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const files = field.value || [];

    const handleFiles = (newFiles: FileList | File[]) => {
        const fileArray = Array.from(newFiles);
        const validFiles = fileArray.filter(file => acceptedTypes.includes(file.type));

        if (validFiles.length + files.length > maxFiles) {
            const remainingSlots = maxFiles - files.length;
            validFiles.splice(remainingSlots);
        }

        helpers.setValue([...files, ...validFiles]);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const getDisplayText = () => {
        if (files.length === 0) {
            return placeholder;
        }
        if (files.length === 1) {
            return `${files[0].name}`;
        }
        return `${files.length} files selected`;
    };

    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            <label htmlFor={name} className="block text-xl font-medium font-amulya">
                {label}
            </label>

            {/* Input-like file upload */}
            <div
                className={`
                    p-2.5 w-full border border-dashed rounded-md cursor-pointer transition-colors flex items-center gap-2
                    ${meta.touched && meta.error
                    ? 'border-red-500'
                    : 'dark:border-[#d0d0d0] border-[#121212] hover:border-red-400'
                }
                `}
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <Upload className="w-4 h-4 dark:text-[#d0d0d0] flex-shrink-0" />
                <span className={`text-sm font-synonym flex-1 ${
                    files.length === 0 ? 'dark:text-[#d0d0d0]' : 'text-[#121212] dark:text-white'
                }`}>
                    {getDisplayText()}
                </span>
                <span className="text-xs dark:text-[#d0d0d0] font-synonym">
                    ({files.length}/{maxFiles})
                </span>
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedTypes.join(',')}
                className="hidden"
                onChange={handleInputChange}
            />

            {/* Error Message */}
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm font-synonym" />

            {/* File Count Validation Message */}
            {files.length !== maxFiles && meta.touched && (
                <div className="text-red-500 text-sm font-synonym">
                    Please upload exactly {maxFiles} photos
                </div>
            )}
        </div>
    );
}