import { InputFieldProps } from "@/types";

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '-' || event.key === 'e' || event.key === 'E') {
        event.preventDefault(); // Prevent entry of minus sign (-) and 'e' or 'E' for exponential notation
    }
};

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => (
    <label className="flex flex-col">
        <span className="text-sm">{label}</span>
        <input
            type="number"
            value={value === 0 ? '' : value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            className="mt-.95 p-1 border border-gray-300 rounded-md outline-none"
        />
    </label>
);