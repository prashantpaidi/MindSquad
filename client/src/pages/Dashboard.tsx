import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DeckSelector from '../components/DeckSelector';
import CreateDeckModal from '../components/CreateDeckModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { Deck } from '../types';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);
    const [sharingDeck, setSharingDeck] = useState<Deck | null>(null);

    const [editingDeckData, setEditingDeckData] = useState<{ _id: string; name: string; description: string; cards: any[] } | null>(null);

    useEffect(() => {
        fetchDecks();
    }, []);

    const fetchDecks = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/decks`);
            setDecks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateDeck = async (name: string, description: string, cards: { _id?: string; front: string; back: string }[]) => {
        try {
            if (editingDeckData) {
                // UPDATE EXISTING DECK
                const deckId = editingDeckData._id;

                // 1. Update Deck Details
                await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/decks/${deckId}`, { name, description });

                // 2. Handle Cards
                const originalCards = editingDeckData.cards;
                const submittedCardIds = new Set(cards.filter(c => c._id).map(c => c._id));

                // Identify cards to delete (present in original but not in submitted)
                const cardsToDelete = originalCards.filter(c => !submittedCardIds.has(c._id));
                await Promise.all(cardsToDelete.map(c => axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/cards/${c._id}`)));

                // Identify cards to update or create
                await Promise.all(cards.map(card => {
                    if (card._id) {
                        // Update existing card
                        return axios.put(`${import.meta.env.VITE_APP_API_URL}/api/cards/${card._id}`, {
                            front: card.front,
                            back: card.back
                        });
                    } else {
                        // Create new card
                        return axios.post(`${import.meta.env.VITE_APP_API_URL}/api/cards`, {
                            front: card.front,
                            back: card.back,
                            deckId: deckId
                        });
                    }
                }));

                // Update local state
                fetchDecks();

                setEditingDeckData(null);
            } else {
                // CREATE NEW DECK
                // 1. Create Deck
                const deckRes = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/decks`, { name, description });
                const newDeck = deckRes.data;

                // 2. Create Cards (if any)
                if (cards.length > 0) {
                    await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/cards/bulk`, {
                        cards: cards.map(c => ({ front: c.front, back: c.back })),
                        deckId: newDeck._id
                    });

                    // Update counts locally since we added cards
                    newDeck.cardCount = cards.length;
                    newDeck.dueCount = cards.length;
                }

                setDecks([...decks, newDeck]);
            }

            setIsCreateDeckModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to save deck. Please try again.');
        }
    };

    const handleDeleteDeck = async (deckId: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/decks/${deckId}`);
            setDecks(decks.filter(d => d._id !== deckId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditDeck = async (deck: Deck) => {
        try {
            // Fetch cards for this deck
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/cards/${deck._id}`);
            const cards = res.data;

            setEditingDeckData({
                _id: deck._id,
                name: deck.name,
                description: deck.description,
                cards: cards
            });
            setIsCreateDeckModalOpen(true);
        } catch (err) {
            console.error(err);
            alert('Failed to load deck details.');
        }
    };

    const handleStudyDeck = (deckId: string) => {
        navigate(`/study/${deckId}`);
    };

    const handleCloseModal = () => {
        setIsCreateDeckModalOpen(false);
        setEditingDeckData(null);
    };

    const handleShareDeckClick = (deck: Deck) => {
        setSharingDeck(deck);
    };

    const confirmShareDeck = async () => {
        if (!sharingDeck) return;

        try {
            const res = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/decks/${sharingDeck._id}/share`);
            // Update local state
            setDecks(decks.map(d => d._id === sharingDeck._id ? { ...d, isPublic: res.data.isPublic } : d));
            setSharingDeck(null);
        } catch (err) {
            console.error(err);
            alert('Failed to update share status.');
        }
    };

    return (
        <div>
            <header className="border-b-2 border-black bg-white sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
                    <h1 className="text-2xl font-bold text-black cursor-pointer" onClick={() => navigate('/')}>
                        MIND<span className="text-gray-600">SQUAD</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600">
                                    {user.username}
                                </span>
                                <button
                                    onClick={logout}
                                    className="py-2 px-4 text-xs border-2 border-black rounded-none bg-white hover:bg-lime-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                                >
                                    LOGOUT
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="py-2 px-4 text-xs border-2 border-black rounded-none bg-white hover:bg-lime-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                                >
                                    LOGIN
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="py-2 px-4 text-xs border-2 border-black rounded-none bg-lime-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                                >
                                    SIGN UP
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto p-8">
                <DeckSelector
                    decks={decks}
                    onSelectDeck={handleStudyDeck}
                    onCreateDeck={() => {
                        setEditingDeckData(null);
                        setIsCreateDeckModalOpen(true);
                    }}
                    onDeleteDeck={handleDeleteDeck}
                    onEditDeck={handleEditDeck}
                    onShareDeck={handleShareDeckClick}
                />
            </main>

            <CreateDeckModal
                isOpen={isCreateDeckModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateDeck}
                initialData={editingDeckData || undefined}
            />

            <ConfirmationModal
                isOpen={!!sharingDeck}
                onClose={() => setSharingDeck(null)}
                onConfirm={confirmShareDeck}
                title={sharingDeck?.isPublic ? "Unshare Deck" : "Share Deck"}
                message={sharingDeck?.isPublic
                    ? `Are you sure you want to unshare "${sharingDeck?.name}"? It will no longer be visible to the community.`
                    : `Are you sure you want to share "${sharingDeck?.name}" with the community? Others will be able to see and fork it.`}
                confirmText={sharingDeck?.isPublic ? "Unshare" : "Share"}
                variant={sharingDeck?.isPublic ? "danger" : "info"}
            />
        </div>
    );
}
