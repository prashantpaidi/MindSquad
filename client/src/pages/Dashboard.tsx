import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, logOut } from '../store/authSlice';
import DeckSelector from '../components/DeckSelector';
import CreateDeckModal from '../components/CreateDeckModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { Deck } from '../types';
import {
    useGetDecksQuery,
    useCreateDeckMutation,
    useUpdateDeckMutation,
    useDeleteDeckMutation,
    useShareDeckMutation,
    useCreateCardsBulkMutation,
    useDeleteCardMutation,
    useUpdateCardMutation,
    useCreateCardMutation,
    useLazyGetCardsQuery
} from '../store/apiSlice';

export default function Dashboard() {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logOut());
        navigate('/login');
    };

    // RTK Query Hooks
    const { data: decks = [], isLoading: isDecksLoading, error: decksError } = useGetDecksQuery();
    const [createDeck] = useCreateDeckMutation();
    const [updateDeck] = useUpdateDeckMutation();
    const [deleteDeck] = useDeleteDeckMutation();
    const [shareDeckMutation] = useShareDeckMutation();
    const [createCardsBulk] = useCreateCardsBulkMutation();
    const [deleteCard] = useDeleteCardMutation();
    const [updateCard] = useUpdateCardMutation();
    const [createCard] = useCreateCardMutation();
    const [triggerGetCards] = useLazyGetCardsQuery();

    const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);
    const [sharingDeck, setSharingDeck] = useState<Deck | null>(null);
    const [editingDeckData, setEditingDeckData] = useState<{ _id: string; name: string; description: string; cards: any[] } | null>(null);



    const handleCreateDeck = async (name: string, description: string, cards: { _id?: string; front: string; back: string }[]) => {
        try {
            if (editingDeckData) {
                // UPDATE EXISTING DECK
                const deckId = editingDeckData._id;

                // 1. Update Deck Details
                await updateDeck({ id: deckId, name, description }).unwrap();

                // 2. Handle Cards
                const originalCards = editingDeckData.cards;
                const submittedCardIds = new Set(cards.filter(c => c._id).map(c => c._id));

                // Identify cards to delete
                const cardsToDelete = originalCards.filter(c => !submittedCardIds.has(c._id));
                await Promise.all(cardsToDelete.map(c => deleteCard(c._id).unwrap()));

                // Identify cards to update or create
                await Promise.all(cards.map(card => {
                    if (card._id) {
                        return updateCard({ id: card._id, front: card.front, back: card.back }).unwrap();
                    } else {
                        return createCard({ front: card.front, back: card.back, deckId: deckId }).unwrap();
                    }
                }));

                setEditingDeckData(null);
            } else {
                // CREATE NEW DECK
                // 1. Create Deck
                const newDeck = await createDeck({ name, description }).unwrap();

                // 2. Create Cards (if any)
                if (cards.length > 0) {
                    await createCardsBulk({
                        cards: cards.map(c => ({ front: c.front, back: c.back })),
                        deckId: newDeck._id
                    }).unwrap();
                }
            }

            setIsCreateDeckModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to save deck. Please try again.');
        }
    };

    const handleDeleteDeck = async (deckId: string) => {
        try {
            await deleteDeck(deckId).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditDeck = async (deck: Deck) => {
        try {
            // Fetch cards for this deck using lazy query
            const cards = await triggerGetCards(deck._id).unwrap();

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
            await shareDeckMutation(sharingDeck._id).unwrap();
            setSharingDeck(null);
        } catch (err) {
            console.error(err);
            alert('Failed to update share status.');
        }
    };

    if (isDecksLoading) return <div className="p-8">Loading decks...</div>;
    // We can handle error state more gracefully, but for now simplistic approach
    if (decksError) return <div className="p-8 text-red-500">Error loading decks</div>;

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
                {decks.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl mb-4">You don't have any decks yet.</p>
                        <button
                            onClick={() => {
                                setEditingDeckData(null);
                                setIsCreateDeckModalOpen(true);
                            }}
                            className="bg-lime-300 px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-y-[4px] active:shadow-none transition-all font-bold"
                        >
                            Create Your First Deck
                        </button>
                    </div>
                ) : (
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
                )}
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
