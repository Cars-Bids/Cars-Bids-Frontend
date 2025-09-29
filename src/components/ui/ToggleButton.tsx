import { useField } from "formik";

type ToggleButtonProps = {
    name: string;
    label: string;
};

export function ToggleButton({ name, label }: ToggleButtonProps) {
    const [field, , helpers] = useField({ name, type: "checkbox" });

    return (
        <button
            type="button"
            onClick={() => helpers.setValue(!field.value)}
            className={`px-1.5 py-0.5 rounded-lg font-synonym font-bold transition-colors w-min hover:border-[#ce2023]
            ${field.value ? "bg-white text-black border" : "bg-[#d0d0d0] text-white border border-white"}`}
>
    {label}
    </button>
);
}
