import { Deck } from '../types';

interface DeckSelectorProps {
    decks: Deck[];
    onSelectDeck: (deckId: string) => void;
    onCreateDeck: () => void;
    onDeleteDeck: (deckId: string) => void;
}

export default function DeckSelector({
    decks,
    onSelectDeck,
    onCreateDeck,
    onDeleteDeck
}: DeckSelectorProps) {
    return (
        <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600 font-[family-name:var(--font-mono)] mb-6">
                MY DECKS
            </h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                {/* Create New Deck Card */}
                <div
                    onClick={onCreateDeck}
                    className="border-2 border-dashed border-gray-400 bg-gray-50 hover:bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_#000] p-6 cursor-pointer transition-all min-h-[200px] flex flex-col items-center justify-center"
                >
                    <div className="text-center">
                        <div className="text-4xl mb-3">+</div>
                        <h3 className="font-bold text-lg mb-2 uppercase">Create Deck</h3>
                        <div className="flex gap-2 justify-center mt-4">
                            <span className="text-xs py-1 px-3 bg-white border border-gray-300 font-[family-name:var(--font-mono)] font-bold uppercase">
                                Manual
                            </span>
                            <span className="text-xs py-1 px-3 bg-lime-200 border border-gray-300 font-[family-name:var(--font-mono)] font-bold uppercase">
                                AI Gen ✨
                            </span>
                        </div>
                    </div>
                </div>

                {/* Deck Cards */}
                {decks.map(deck => (
                    <div
                        key={deck._id}
                        className="relative border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] p-6 transition-all min-h-[200px] flex flex-col"
                    >
                        {/* Delete Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Delete "${deck.name}" and all its cards?`)) {
                                    onDeleteDeck(deck._id);
                                }
                            }}
                            className="absolute top-2 right-2 py-1 px-2 bg-red-400 text-black text-xs border border-black hover:bg-black hover:text-red-400 transition-colors font-[family-name:var(--font-mono)] font-bold uppercase"
                        >
                            ×
                        </button>

                        {/* Deck Info */}
                        <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2 pr-6 uppercase">{deck.name}</h3>
                            {deck.description && (
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{deck.description}</p>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="mt-4 space-y-2">
                            <div className="font-[family-name:var(--font-mono)] text-sm text-gray-600">
                                {deck.cardCount} {deck.cardCount === 1 ? 'Card' : 'Cards'}
                            </div>
                            {deck.dueCount > 0 && (
                                <div className="font-[family-name:var(--font-mono)] text-sm font-bold text-black">
                                    Due: {deck.dueCount}
                                </div>
                            )}
                            {deck.dueCount === 0 && deck.cardCount > 0 && (
                                <div className="font-[family-name:var(--font-mono)] text-sm text-green-600">
                                    Due: 0 (Done)
                                </div>
                            )}
                        </div>

                        {/* Study Button */}
                        {deck.cardCount > 0 && (
                            <button
                                onClick={() => onSelectDeck(deck._id)}
                                className={`
                                    mt-4 w-full py-2 px-4 border-2 border-black rounded-none font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer text-sm
                                    ${deck.dueCount > 0
                                        ? 'bg-lime-300 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000]'
                                        : 'bg-gray-200 hover:bg-gray-300 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000]'
                                    }
                                `}
                            >
                                {deck.dueCount > 0 ? 'STUDY >' : 'REVIEW'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
