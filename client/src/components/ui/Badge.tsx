import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'lime' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export default function Badge({
    children,
    variant = 'default',
    size = 'md'
}: BadgeProps) {
    const variantStyles = {
        default: 'bg-gray-200 text-gray-600',
        lime: 'bg-lime-300 text-black',
        outline: 'bg-transparent border-2 border-black text-black'
    };

    const sizeStyles = {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-sm px-2 py-1',
        lg: 'text-base px-3 py-1.5'
    };

    return (
        <span className={`inline-flex items-center font-[family-name:var(--font-mono)] font-medium rounded-none ${variantStyles[variant]} ${sizeStyles[size]}`}>
            {children}
        </span>
    );
}
