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

    // AI State
    const [aiInput, setAiInput] = useState('');
    const [aiMode, setAiMode] = useState<'topic' | 'text'>('topic');
    const [aiCount, setAiCount] = useState<number | 'auto'>('auto');
    const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

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



    const handleGenerate = async () => {
        setIsGenerating(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/ai/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify({
                    input: aiInput,
                    mode: aiMode,
                    count: aiCount,
                    difficulty: aiDifficulty
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to generate flashcards');
            }

            const data = await response.json();

            // Transform data if necessary (ensure _id is not present for new cards)
            const newCards = data.map((card: any) => ({
                front: card.front,
                back: card.back
            }));

            setCards(newCards);
            setMode('MANUAL');
            // Optional: Set name based on input if topic mode
            if (aiMode === 'topic' && !name) {
                setName(aiInput.substring(0, 50));
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    if (mode === 'AI') {
        const isLoading = isGenerating;

        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <div
                    className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 max-w-lg w-full flex flex-col max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
                        <h2 className="text-2xl font-bold uppercase tracking-wider flex items-center gap-2">
                            ✨ AI Generator
                        </h2>
                        <button onClick={() => setMode('SELECT')} className="text-gray-500 hover:text-black font-bold">Close</button>
                    </div>

                    <div className="space-y-6">
                        {/* Mode Selection */}
                        <div className="flex bg-gray-100 p-1 border-2 border-black">
                            <button
                                onClick={() => setAiMode('topic')}
                                className={`flex-1 py-2 font-bold uppercase text-sm transition-colors ${aiMode === 'topic' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                            >
                                Topic
                            </button>
                            <button
                                onClick={() => setAiMode('text')}
                                className={`flex-1 py-2 font-bold uppercase text-sm transition-colors ${aiMode === 'text' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                            >
                                Text Content
                            </button>
                        </div>

                        {/* Input Area */}
                        <div>
                            <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600 font-bold">
                                {aiMode === 'topic' ? 'Enter Topic:' : 'Paste Text Content:'}
                            </label>
                            {aiMode === 'topic' ? (
                                <input
                                    type="text"
                                    value={aiInput}
                                    onChange={(e) => setAiInput(e.target.value)}
                                    placeholder="e.g. The French Revolution"
                                    className="w-full p-4 border-2 border-black rounded-none font-bold text-lg outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
                                />
                            ) : (
                                <textarea
                                    value={aiInput}
                                    onChange={(e) => setAiInput(e.target.value)}
                                    placeholder="Paste your notes or article here..."
                                    rows={6}
                                    className="w-full p-4 border-2 border-black rounded-none font-medium text-sm outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50 resize-y"
                                />
                            )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600 font-bold">
                                    Count:
                                </label>
                                <select
                                    value={aiCount}
                                    onChange={(e) => setAiCount(e.target.value === 'auto' ? 'auto' : Number(e.target.value))}
                                    className="w-full p-2 border-2 border-black font-[family-name:var(--font-mono)] font-bold outline-none focus:bg-purple-50"
                                >
                                    <option value="auto">Auto</option>
                                    <option value={5}>5 Cards</option>
                                    <option value={10}>10 Cards</option>
                                    <option value={15}>15 Cards</option>
                                    <option value={20}>20 Cards</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600 font-bold">
                                    Difficulty:
                                </label>
                                <select
                                    value={aiDifficulty}
                                    onChange={(e) => setAiDifficulty(e.target.value as any)}
                                    className="w-full p-2 border-2 border-black font-[family-name:var(--font-mono)] font-bold outline-none focus:bg-purple-50"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 font-bold text-sm">
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !aiInput.trim()}
                            className={`w-full py-4 border-2 border-black font-bold uppercase text-lg transition-all flex items-center justify-center gap-2
                                ${isLoading || !aiInput.trim()
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-purple-300 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000]'}
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    ✨ Generate Cards
                                </>
                            )}
                        </button>
                    </div>
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
                                    className="absolute top-2 right-2 p-1.5 bg-red-400 text-black border border-black hover:bg-black hover:text-red-400 transition-colors shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none"
                                    title="Delete Card"
                                >
                                    <Trash2 size={14} strokeWidth={2.5} />
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
