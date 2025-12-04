import { ReactNode } from 'react';

interface CardProps {
    variant?: 'solid' | 'dashed' | 'ghost';
    title?: string;
    children: ReactNode;
    className?: string;
}

export default function Card({
    variant = 'solid',
    title,
    children,
    className = ''
}: CardProps) {
    const baseStyles = 'p-6';

    const variantStyles = {
        solid: 'bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_#000]',
        dashed: 'bg-white border-2 border-dashed border-black shadow-[4px_4px_0px_0px_#000]',
        ghost: 'bg-transparent'
    };

    return (
        <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
            {title && (
                <h2 className="mb-6 text-center font-bold uppercase tracking-tight text-black">
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}
