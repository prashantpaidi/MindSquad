import { useState } from 'react';
import { Deck } from '../types';
import ConfirmationModal from './ConfirmationModal';
import DeckCard from './DeckCard';
import { useNavigate } from 'react-router-dom';

interface DeckSelectorProps {
    decks: Deck[];
    onSelectDeck: (deckId: string) => void;
    onCreateDeck: () => void;
    onDeleteDeck: (deckId: string) => void;
    onEditDeck: (deck: Deck) => void;
    onShareDeck?: (deck: Deck) => void;
}

export default function DeckSelector({
    decks,
    onSelectDeck,
    onCreateDeck,
    onDeleteDeck,
    onEditDeck,
    onShareDeck
}: DeckSelectorProps) {
    const [deletingDeck, setDeletingDeck] = useState<Deck | null>(null);
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600 font-[family-name:var(--font-mono)]">
                    MY DECKS
                </h2>
                <button
                    onClick={() => navigate('/community')}
                    className="text-xs py-1.5 px-3 bg-white border-2 border-black font-bold uppercase hover:bg-gray-100 hover:shadow-[4px_4px_0px_0px_#000] transition-all"
                >
                    Browse Community →
                </button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                {/* Create New Deck Card */}
                <div
                    onClick={onCreateDeck}
                    className="border-2 border-dashed border-gray-400 bg-gray-50 hover:bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_#000] p-6 cursor-pointer transition-all min-h-[220px] flex flex-col items-center justify-center"
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
                    <DeckCard
                        key={deck._id}
                        deck={deck}
                        variant="personal"
                        onSelect={onSelectDeck}
                        onEdit={onEditDeck}
                        onDelete={() => setDeletingDeck(deck)}
                        onShare={onShareDeck}
                    />
                ))}
            </div>

            <ConfirmationModal
                isOpen={!!deletingDeck}
                onClose={() => setDeletingDeck(null)}
                onConfirm={() => {
                    if (deletingDeck) {
                        onDeleteDeck(deletingDeck._id);
                    }
                }}
                title="Delete Deck"
                message={`Are you sure you want to delete "${deletingDeck?.name}"? This will permanently delete the deck and all ${deletingDeck?.cardCount} cards inside it.`}
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
