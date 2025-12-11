import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface CardInput {
    _id?: string;
    front: string;
    back: string;
}

interface CreateDeckModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, description: string, cards: CardInput[]) => void;
    initialData?: {
        name: string;
        description: string;
        cards: CardInput[];
    };
}

export default function CreateDeckModal({ isOpen, onClose, onSubmit, initialData }: CreateDeckModalProps) {
    const [mode, setMode] = useState<'SELECT' | 'MANUAL' | 'AI'>('SELECT');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cards, setCards] = useState<CardInput[]>([{ front: '', back: '' }]);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setMode('MANUAL');
                setName(initialData.name);
                setDescription(initialData.description);
                setCards(initialData.cards.length > 0 ? initialData.cards : [{ front: '', back: '' }]);
            } else {
                setMode('SELECT');
                setName('');
                setDescription('');
                setCards([{ front: '', back: '' }]);
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Filter out empty cards
        const validCards = cards.filter(c => c.front.trim() || c.back.trim());
        onSubmit(name, description, validCards);
    };

    const addCard = () => {
        setCards([...cards, { front: '', back: '' }]);
    };

    const removeCard = (index: number) => {
        if (cards.length > 1) {
            setCards(cards.filter((_, i) => i !== index));
        } else {
            // If it's the last card, just clear it
            setCards([{ front: '', back: '' }]);
        }
    };

    const updateCard = (index: number, field: 'front' | 'back', value: string) => {
        const newCards = [...cards];
        newCards[index][field] = value;
        setCards(newCards);
    };

    if (mode === 'SELECT') {
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <div
                    className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 max-w-2xl w-full mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-8 uppercase text-center tracking-wider">
                        Create New Deck
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Manual Option */}
                        <button
                            onClick={() => setMode('MANUAL')}
                            className="group flex flex-col items-center p-8 border-2 border-black hover:bg-lime-300 transition-all hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_#000]"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📝</div>
                            <h3 className="font-bold text-xl uppercase mb-2">Manual Entry</h3>
                            <p className="text-center text-sm text-gray-600 font-[family-name:var(--font-mono)]">
                                Create cards one by one with full control
                            </p>
                        </button>

                        {/* AI Option */}
                        <button
                            onClick={() => setMode('AI')}
                            className="group flex flex-col items-center p-8 border-2 border-black hover:bg-purple-300 transition-all hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_#000]"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✨</div>
                            <h3 className="font-bold text-xl uppercase mb-2">AI Generator</h3>
                            <p className="text-center text-sm text-gray-600 font-[family-name:var(--font-mono)]">
                                Generate cards from a topic or text
                            </p>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black font-[family-name:var(--font-mono)] uppercase text-sm underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'AI') {
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <div
                    className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 max-w-md w-full mx-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-6xl mb-4">🚧</div>
                    <h2 className="text-2xl font-bold mb-4 uppercase">Coming Soon</h2>
                    <p className="text-gray-600 mb-8 font-[family-name:var(--font-mono)]">
                        AI Deck Generation is currently under construction.
                    </p>
                    <button
                        onClick={() => setMode('SELECT')}
                        className="bg-white py-2 px-6 border-2 border-black rounded-none hover:bg-gray-100 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                    >
                        GO BACK
                    </button>
                </div>
            </div>
        );
    }

    // MANUAL MODE
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10"
            onClick={onClose}
        >
            <div
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-0 max-w-3xl w-full mx-4 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b-2 border-black bg-gray-50">
                    <button
                        onClick={() => initialData ? onClose() : setMode('SELECT')}
                        className="text-sm font-bold uppercase hover:text-gray-600 flex items-center gap-2"
                    >
                        &lt; Cancel
                    </button>
                    <h2 className="text-xl font-bold uppercase tracking-wider">
                        {initialData ? 'Edit Deck' : 'New Deck Creation'}
                    </h2>
                    <button
                        onClick={handleSubmit}
                        className="bg-lime-300 py-2 px-4 border-2 border-black rounded-none hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer text-sm"
                    >
                        Save Deck
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1">
                    <div className="mb-8">
                        <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600 font-bold">
                            DECK TITLE:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="e.g. ReactJS Basics"
                            className="w-full p-4 border-2 border-black rounded-none font-bold text-xl outline-none focus:ring-2 focus:ring-lime-300 bg-gray-50"
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (optional)"
                            className="w-full mt-2 p-2 border-b-2 border-gray-200 font-[family-name:var(--font-mono)] text-sm outline-none focus:border-black bg-transparent"
                        />
                    </div>

                    <div className="mb-4 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600 font-bold">
                        CARDS:
                    </div>

                    <div className="space-y-6">
                        {cards.map((card, index) => (
                            <div key={index} className="border-2 border-black p-4 relative bg-white hover:shadow-[4px_4px_0px_0px_#000] transition-shadow">
                                <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-bold font-[family-name:var(--font-mono)]">
                                    #{index + 1}
                                </div>

                                <div className="mt-4 grid gap-4">
                                    <div>
                                        <label className="block mb-1 text-xs font-bold uppercase text-gray-500">FRONT (Question)</label>
                                        <input
                                            value={card.front}
                                            onChange={(e) => updateCard(index, 'front', e.target.value)}
                                            placeholder="What is..."
                                            className="w-full p-2 border-b-2 border-gray-300 focus:border-lime-300 outline-none font-medium transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-xs font-bold uppercase text-gray-500">BACK (Answer)</label>
                                        <input
                                            value={card.back}
                                            onChange={(e) => updateCard(index, 'back', e.target.value)}
                                            placeholder="It is..."
                                            className="w-full p-2 border-b-2 border-gray-300 focus:border-lime-300 outline-none font-medium transition-colors"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeCard(index)}
                                    className="absolute bottom-4 right-4 text-red-500 hover:text-red-700 font-bold text-sm uppercase flex items-center gap-1"
                                    title="Delete Card"
                                >
                                    <Trash2 size={14} /> Del
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addCard}
                        className="w-full mt-6 py-4 border-2 border-dashed border-gray-400 text-gray-500 hover:border-black hover:text-black hover:bg-gray-50 font-bold uppercase transition-all"
                    >
                        + Add Another Card
                    </button>
                </div>
            </div>
        </div>
    );
}
