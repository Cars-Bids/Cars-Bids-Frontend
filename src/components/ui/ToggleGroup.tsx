import { useField, ErrorMessage } from "formik";

type Props = {
    name: string;
    label: string;
    options: { value: string | boolean; label: string }[];
};

export function ToggleGroup({ name, label, options }: Props) {
    const [field, , helpers] = useField(name);

    const handleSelect = (val: string | boolean) => {
        helpers.setValue(val);
    };

    return (
        <div className="flex flex-col mt-4">
            <label className="block font-medium mb-4 text-xl font-amulya">{label}</label>
            <div className="flex space-x-2">
                {options.map((opt) => (
                    <button
                        key={opt.value.toString()}
                        type="button"
                        onClick={() => handleSelect(opt.value)}
                        className={`p-2 border rounded-md font-synonym transition-colors ${
                            field.value === opt.value
                                ? "bg-[#d0d0d0] text-[#2c2c2c] border-[#d0d0d0]"
                                : "border-[#d0d0d0] hover:text-[#2c2c2c] hover:bg-[#cccccc]"
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm font-synonym mt-1" />
        </div>
    );
}
