import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'border-2 border-black rounded-none font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none';

    const variantStyles = {
        primary: 'bg-lime-300 text-black hover:bg-lime-400',
        secondary: 'bg-white text-black hover:bg-lime-300',
        danger: 'bg-red-400 text-black hover:bg-black hover:text-red-400',
        ghost: 'bg-white text-black hover:bg-lime-300'
    };

    const sizeStyles = {
        sm: 'py-1 px-2 text-xs',
        md: 'py-2 px-4 text-sm',
        lg: 'py-3 px-6 text-base'
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
