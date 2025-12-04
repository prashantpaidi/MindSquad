import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
    label,
    error,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600">
                    {label}
                </label>
            )}
            <input
                className={`w-full p-3 border-2 border-black rounded-none font-[family-name:var(--font-mono)] text-base outline-none focus:ring-2 focus:ring-lime-300 focus:outline-none ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm font-[family-name:var(--font-mono)] text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
