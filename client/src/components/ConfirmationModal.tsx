

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger'
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4">
                    {title}
                </h2>

                <p className="text-gray-600 mb-8 font-[family-name:var(--font-mono)]">
                    {message}
                </p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 font-[family-name:var(--font-mono)] text-sm font-bold uppercase hover:underline"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`
                            px-6 py-2 border-2 border-black font-[family-name:var(--font-mono)] font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none
                            ${variant === 'danger' ? 'bg-red-400 hover:bg-red-500' : 'bg-lime-300 hover:bg-lime-400'}
                        `}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
