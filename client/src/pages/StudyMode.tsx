import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, ReviewResponse } from '../types';

export default function StudyMode() {
    const { deckId } = useParams<{ deckId: string }>();
    const navigate = useNavigate();
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deckName, setDeckName] = useState('');

    useEffect(() => {
        fetchDueCards();
    }, [deckId]);

    const fetchDueCards = async () => {
        try {
            setLoading(true);
            // Get deck name
            const decksRes = await axios.get('/api/decks');
            const deck = decksRes.data.find((d: any) => d._id === deckId);
            if (deck) setDeckName(deck.name);

            // Get due cards
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/cards/due/${deckId}`);
            setCards(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleReview = async (response: ReviewResponse) => {
        if (currentIndex >= cards.length) return;

        try {
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/cards/${cards[currentIndex]._id}/review`, { response });

            // Move to next card
            if (currentIndex < cards.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setIsFlipped(false);
            } else {
                // Session complete
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getIntervalText = (response: ReviewResponse): string => {
        const card = cards[currentIndex];
        if (!card) return '';

        switch (response) {
            case 'AGAIN':
                return '1 min';
            case 'HARD':
                return card.reviewCount === 0 ? '1 day' : `${Math.max(1, Math.round(card.interval * 1.2))} days`;
            case 'GOOD':
                if (card.reviewCount === 0) return '1 day';
                if (card.reviewCount === 1) return '6 days';
                return `${Math.round(card.interval * card.easeFactor)} days`;
            case 'EASY':
                if (card.reviewCount === 0) return '4 days';
                return `${Math.round(card.interval * card.easeFactor * 1.3)} days`;
            default:
                return '';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-lime-300 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_#000] py-4 px-8 font-[family-name:var(--font-mono)] font-bold uppercase text-black">
                    Loading...
                </div>
            </div>
        );
    }

    if (cards.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 uppercase">No Cards Due!</h2>
                    <p className="text-gray-600 font-[family-name:var(--font-mono)]">
                        All caught up! Come back later.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="bg-lime-300 py-3 px-6 border-2 border-black rounded-none hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                >
                    BACK TO DASHBOARD
                </button>
            </div>
        );
    }

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b-2 border-black bg-white">
                <div className="max-w-screen-lg mx-auto flex justify-between items-center p-4">
                    <button
                        onClick={() => navigate('/')}
                        className="py-2 px-4 text-sm border-2 border-black rounded-none bg-white hover:bg-gray-100 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                    >
                        ← EXIT
                    </button>
                    <h1 className="text-xl font-bold uppercase tracking-tight">
                        {deckName} (Card {currentIndex + 1} of {cards.length})
                    </h1>
                    {isFlipped && (
                        <button className="py-2 px-4 text-sm border-2 border-black rounded-none bg-white hover:bg-lime-300 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer">
                            EDIT ✎
                        </button>
                    )}
                    {!isFlipped && <div className="w-24"></div>}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-3xl">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-[family-name:var(--font-mono)] text-sm text-gray-600 uppercase">
                                Progress:
                            </span>
                            <span className="font-[family-name:var(--font-mono)] text-sm text-gray-600">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="w-full h-4 border-2 border-black bg-white">
                            <div
                                className="h-full bg-lime-300 border-r-2 border-black transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Card Display */}
                    <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000] p-12 min-h-[400px] flex flex-col items-center justify-center">
                        {!isFlipped ? (
                            <div className="w-full text-center">
                                <div className="mb-12">
                                    <p className="text-2xl font-bold leading-relaxed">{currentCard.front}</p>
                                </div>
                                <button
                                    onClick={() => setIsFlipped(true)}
                                    className="bg-white py-3 px-8 border-2 border-black rounded-none hover:bg-lime-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                                >
                                    CLICK TO FLIP ↻
                                </button>
                            </div>
                        ) : (
                            <div className="w-full">
                                <div className="mb-8">
                                    <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600 mb-3">
                                        ANSWER:
                                    </p>
                                    <p className="text-xl leading-relaxed">{currentCard.back}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SRS Buttons */}
                    {isFlipped && (
                        <div className="mt-8">
                            <p className="text-center font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-gray-600 mb-4">
                                How well did you know this?
                            </p>
                            <div className="grid grid-cols-4 gap-4">
                                <button
                                    onClick={() => handleReview('AGAIN')}
                                    className="bg-red-200 py-4 px-4 border-2 border-black rounded-none hover:bg-red-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer text-sm"
                                >
                                    <div>AGAIN</div>
                                    <div className="text-xs mt-1 font-normal">({getIntervalText('AGAIN')})</div>
                                </button>
                                <button
                                    onClick={() => handleReview('HARD')}
                                    className="bg-yellow-200 py-4 px-4 border-2 border-black rounded-none hover:bg-yellow-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer text-sm"
                                >
                                    <div>HARD</div>
                                    <div className="text-xs mt-1 font-normal">({getIntervalText('HARD')})</div>
                                </button>
                                <button
                                    onClick={() => handleReview('GOOD')}
                                    className="bg-blue-200 py-4 px-4 border-2 border-black rounded-none hover:bg-blue-300 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer text-sm"
                                >
                                    <div>GOOD</div>
                                    <div className="text-xs mt-1 font-normal">({getIntervalText('GOOD')})</div>
                                </button>
                                <button
                                    onClick={() => handleReview('EASY')}
                                    className="bg-lime-300 py-4 px-4 border-2 border-black rounded-none hover:bg-lime-400 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[4px] active:shadow-none shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer text-sm"
                                >
                                    <div>EASY</div>
                                    <div className="text-xs mt-1 font-normal">({getIntervalText('EASY')})</div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
