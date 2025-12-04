import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer
}: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white border-2 border-black rounded-none shadow-[8px_8px_0px_0px_#000] max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                {title && (
                    <div className="border-b-2 border-black p-4 flex justify-between items-center">
                        <h2 className="font-bold uppercase tracking-tight text-black">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-black hover:text-lime-300 font-bold text-xl transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-6">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="border-t-2 border-black p-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
