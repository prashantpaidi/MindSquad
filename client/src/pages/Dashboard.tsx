import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DeckSelector from '../components/DeckSelector';
import CreateDeckModal from '../components/CreateDeckModal';
import { Deck } from '../types';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);

    useEffect(() => {
        fetchDecks();
    }, []);

    const fetchDecks = async () => {
        try {
            const res = await axios.get('/api/decks');
            setDecks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateDeck = async (name: string, description: string, cards: { front: string; back: string }[]) => {
        try {
            // 1. Create Deck
            const deckRes = await axios.post('/api/decks', { name, description });
            const newDeck = deckRes.data;

            // 2. Create Cards (if any)
            if (cards.length > 0) {
                await Promise.all(cards.map(card =>
                    axios.post('/api/cards', {
                        front: card.front,
                        back: card.back,
                        deckId: newDeck._id
                    })
                ));

                // Update counts locally since we added cards
                // New cards are due immediately by default
                newDeck.cardCount = cards.length;
                newDeck.dueCount = cards.length;
            }

            setDecks([...decks, newDeck]);
            setIsCreateDeckModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to create deck. Please try again.');
        }
    };

    const handleDeleteDeck = async (deckId: string) => {
        try {
            await axios.delete(`/api/decks/${deckId}`);
            setDecks(decks.filter(d => d._id !== deckId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleStudyDeck = (deckId: string) => {
        navigate(`/study/${deckId}`);
    };

    return (
        <div>
            <header className="border-b-2 border-black bg-white sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
                    <h1 className="text-2xl font-bold text-black">
                        MIND<span className="text-gray-600">SQUAD</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600">
                            {user?.username}
                        </span>
                        <button
                            onClick={logout}
                            className="py-2 px-4 text-xs border-2 border-black rounded-none bg-white hover:bg-lime-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto p-8">
                <DeckSelector
                    decks={decks}
                    onSelectDeck={handleStudyDeck}
                    onCreateDeck={() => setIsCreateDeckModalOpen(true)}
                    onDeleteDeck={handleDeleteDeck}
                />
            </main>

            <CreateDeckModal
                isOpen={isCreateDeckModalOpen}
                onClose={() => setIsCreateDeckModalOpen(false)}
                onSubmit={handleCreateDeck}
            />
        </div>
    );
}
