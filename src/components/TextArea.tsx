export default function Textarea({
    icon,
    label,
    name,
    value,
    onChange,
    required,
}: {
    icon: React.ReactNode
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    required?: boolean
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {icon}
                {label}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="border border-gray-300 rounded px-3 py-2"
            />
        </div>
    )
}