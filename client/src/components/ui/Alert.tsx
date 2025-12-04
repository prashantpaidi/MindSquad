import { ReactNode } from 'react';

interface AlertProps {
    variant?: 'error' | 'success' | 'info' | 'warning';
    message?: string;
    children?: ReactNode;
    onDismiss?: () => void;
}

export default function Alert({
    variant = 'info',
    message,
    children,
    onDismiss
}: AlertProps) {
    const variantStyles = {
        error: 'bg-red-400 text-black',
        success: 'bg-lime-300 text-black',
        info: 'bg-white text-black',
        warning: 'bg-yellow-300 text-black'
    };

    return (
        <div className={`${variantStyles[variant]} border-2 border-black rounded-none p-3 mb-4 font-[family-name:var(--font-mono)] flex justify-between items-center`}>
            <div>{message || children}</div>
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="ml-4 text-black hover:text-lime-300 font-bold transition-colors"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
