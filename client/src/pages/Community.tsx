import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DeckCard from '../components/DeckCard';
import { Deck } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Community() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCommunityDecks();
    }, []);

    const fetchCommunityDecks = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/decks/community`);
            setDecks(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleLikeDeck = async (deck: Deck) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/decks/${deck._id}/like`);
            // Update local state
            setDecks(decks.map(d => {
                if (d._id === deck._id) {
                    // Update likes array and likesCount if returned or manually
                    // The backend returns the updated deck. 
                    // We need to preserve the populated userId if the backend doesn't return it populated after update
                    // The backend update returns the deck, but usually not populated unless explicitly done.
                    // Let's check backend implementation: `res.json(deck)` (not populated)
                    const updatedDeck = res.data;

                    // Manually handle likes update in UI to avoid full refetch or loss of populated data
                    // Actually the deck returned by backend has updated likes array.
                    // We just need to update likesCount and likes in our state.
                    return {
                        ...d,
                        likes: updatedDeck.likes,
                        likesCount: updatedDeck.likes.length
                    };
                }
                return d;
            }));
        } catch (err) {
            console.error(err);
            alert('Failed to like deck.');
        }
    };

    const handleForkDeck = async (deck: Deck) => {
        try {
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/decks/${deck._id}/fork`);
            alert('Deck forked successfully! Check your dashboard.');
            // Optionally redirect to dashboard or just show success
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to fork deck. You might already own it or it is private.');
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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600 font-[family-name:var(--font-mono)]">
                        COMMUNITY DECKS
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-xs py-1.5 px-3 bg-white border-2 border-black font-bold uppercase hover:bg-gray-100 hover:shadow-[4px_4px_0px_0px_#000] transition-all"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                {loading ? (
                    <div className="text-center font-[family-name:var(--font-mono)]">Loading community decks...</div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                        {decks.map(deck => (
                            <DeckCard
                                key={deck._id}
                                deck={deck}
                                variant="community"
                                onLike={handleLikeDeck}
                                onFork={handleForkDeck}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
