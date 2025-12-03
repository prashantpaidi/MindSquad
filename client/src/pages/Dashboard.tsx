import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Flashcard from '../components/Flashcard';

interface Card {
    _id: string;
    front: string;
    back: string;
}

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [cards, setCards] = useState<Card[]>([]);
    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const res = await axios.get('/api/cards');
            setCards(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddCard = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/cards', { front: newFront, back: newBack });
            setCards([...cards, res.data]);
            setNewFront('');
            setNewBack('');
            setIsAdding(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/cards/${id}`);
            setCards(cards.filter(c => c._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <header className="border-b-2 border-black p-4 bg-white sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl">MIND<span className="text-gray-400">SQUAD</span></h1>
                    <div className="flex items-center gap-4">
                        <span className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider">{user?.username}</span>
                        <button
                            onClick={logout}
                            className="py-2 px-4 text-xs border-2 border-black bg-white hover:bg-[#ccff00] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-bold uppercase tracking-tight">My Deck <span className="font-[family-name:var(--font-mono)] text-base text-gray-600">[{cards.length}]</span></h2>
                    <button
                        className="bg-[#ccff00] py-3 px-6 border-2 border-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                        onClick={() => setIsAdding(!isAdding)}
                    >
                        {isAdding ? 'CANCEL' : 'ADD CARD +'}
                    </button>
                </div>

                {isAdding && (
                    <div className="border-2 border-dashed border-black shadow-[4px_4px_0px_0px_#000] bg-white p-6 mb-8">
                        <form onSubmit={handleAddCard} className="grid gap-4">
                            <div>
                                <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider">Front Content</label>
                                <input
                                    value={newFront}
                                    onChange={e => setNewFront(e.target.value)}
                                    required
                                    placeholder="Question or Term"
                                    className="w-full p-3 border-2 border-black font-[family-name:var(--font-mono)] text-base outline-none transition-shadow focus:shadow-[4px_4px_0px_0px_#000] focus:bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider">Back Content</label>
                                <input
                                    value={newBack}
                                    onChange={e => setNewBack(e.target.value)}
                                    required
                                    placeholder="Answer or Definition"
                                    className="w-full p-3 border-2 border-black font-[family-name:var(--font-mono)] text-base outline-none transition-shadow focus:shadow-[4px_4px_0px_0px_#000] focus:bg-gray-50"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white py-3 px-6 border-2 border-black hover:bg-[#ccff00] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                            >
                                SAVE TO DECK
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
                    {cards.map(card => (
                        <div key={card._id} className="relative">
                            <Flashcard front={card.front} back={card.back} />
                            <button
                                onClick={() => handleDelete(card._id)}
                                className="absolute -top-2.5 -right-2.5 py-1 px-2 bg-black text-white z-[5] text-xs border-2 border-black hover:bg-[#ccff00] hover:text-black transition-colors cursor-pointer font-[family-name:var(--font-mono)] font-bold uppercase shadow-[2px_2px_0px_0px_#000]"
                            >
                                DEL
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
