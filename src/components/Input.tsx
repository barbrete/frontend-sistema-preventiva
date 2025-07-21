export default function Input({ icon, label, name, value, onChange, required, type = 'text' }: { icon: React.ReactNode, label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, type?: string }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-md font-medium text-gray-700 flex items-center gap-2">
                {icon}
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                required={required}
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
        </div>
    );
}