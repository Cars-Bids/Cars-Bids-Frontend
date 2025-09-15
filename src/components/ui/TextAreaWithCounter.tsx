import { useField, ErrorMessage } from "formik";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    maxLength?: number;
};

export function TextareaWithCounter({ name, label, placeholder, maxLength = 180 }: Props) {
    const [field, meta, helpers] = useField(name);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxLength) helpers.setValue(value);
    };

    return (
        <div className="flex flex-col mt-4 space-y-1">
            <label htmlFor={name} className="block text-xl font-medium font-amulya">
                {label}
            </label>
            <textarea
                {...field}
                id={name}
                rows={1}
                placeholder={placeholder}
                value={field.value || ""}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-md font-synonym placeholder-[#d0d0d0] ${
                    meta.touched && meta.error ? "border-red-500" : "border-[#d0d0d0]"
                }`}
            />
            <div className="flex justify-between items-center">
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm font-synonym" />
                <span className="font-medium text-xs font-synonym text-white">
                    {(field.value?.length || 0)} / {maxLength}
                </span>
            </div>
        </div>
    );
}
