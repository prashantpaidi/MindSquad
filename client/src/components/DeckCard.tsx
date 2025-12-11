import { Deck } from '../types';
import { Pencil, Trash2, Share2, Heart, Copy, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DeckCardProps {
    deck: Deck;
    variant: 'personal' | 'community';
    onSelect?: (deckId: string) => void;
    onEdit?: (deck: Deck) => void;
    onDelete?: (deckId: string) => void;
    onShare?: (deck: Deck) => void;
    onLike?: (deck: Deck) => void;
    onFork?: (deck: Deck) => void;
}

export default function DeckCard({
    deck,
    variant,
    onSelect,
    onEdit,
    onDelete,
    onShare,
    onLike,
    onFork
}: DeckCardProps) {
    const { user } = useAuth();
    const isLiked = user ? deck.likes?.includes(user.userId || '') : false;

    return (
        <div
            className="relative border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] p-6 transition-all min-h-[220px] flex flex-col"
        >
            {/* Top Bar: Badges & Actions */}
            <div className="flex justify-between items-start mb-4">
                {/* Badges */}
                <div className="flex gap-2">
                    {deck.isPublic && variant === 'personal' && (
                        <span className="text-xs py-0.5 px-2 bg-blue-100 border border-black font-[family-name:var(--font-mono)] font-bold uppercase">
                            Public
                        </span>
                    )}
                    {variant === 'community' && deck.userId && typeof deck.userId === 'object' && (
                        <div className="flex items-center gap-1 text-xs font-[family-name:var(--font-mono)] text-gray-600 bg-gray-100 px-2 py-0.5 border border-gray-300">
                            <User size={10} />
                            {(deck.userId as any).username || 'User'}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 z-10">
                    {variant === 'personal' && (
                        <>
                            {onShare && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onShare(deck);
                                    }}
                                    className={`p-1.5 ${deck.isPublic ? 'bg-blue-300' : 'bg-gray-200'} text-black border border-black hover:bg-blue-400 transition-colors shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none`}
                                    title={deck.isPublic ? "Unshare" : "Share with Community"}
                                >
                                    <Share2 size={14} strokeWidth={2.5} />
                                </button>
                            )}
                            {onEdit && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(deck);
                                    }}
                                    className="p-1.5 bg-yellow-200 text-black border border-black hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none"
                                    title="Edit Deck"
                                >
                                    <Pencil size={14} strokeWidth={2.5} />
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(deck._id);
                                    }}
                                    className="p-1.5 bg-red-400 text-black border border-black hover:bg-black hover:text-red-400 transition-colors shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none"
                                    title="Delete Deck"
                                >
                                    <Trash2 size={14} strokeWidth={2.5} />
                                </button>
                            )}
                        </>
                    )}

                    {variant === 'community' && (
                        <>
                            {onLike && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onLike(deck);
                                    }}
                                    className={`flex items-center gap-1 p-1.5 ${isLiked ? 'bg-pink-300' : 'bg-gray-200'} text-black border border-black hover:bg-pink-400 transition-colors shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none`}
                                    title="Like Deck"
                                >
                                    <Heart size={14} strokeWidth={2.5} fill={isLiked ? "currentColor" : "none"} />
                                    <span className="text-xs font-bold font-[family-name:var(--font-mono)]">{deck.likesCount || deck.likes?.length || 0}</span>
                                </button>
                            )}
                            {onFork && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFork(deck);
                                    }}
                                    className="p-1.5 bg-lime-300 text-black border border-black hover:bg-lime-400 transition-colors shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none"
                                    title="Fork Deck"
                                >
                                    <Copy size={14} strokeWidth={2.5} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Deck Info */}
            <div className="flex-1 mt-2">
                <h3 className="font-bold text-xl mb-2 pr-6 uppercase break-words">{deck.name}</h3>
                {deck.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{deck.description}</p>
                )}
            </div>

            {/* Stats */}
            <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center font-[family-name:var(--font-mono)] text-sm text-gray-600">
                    <span>{deck.cardCount} Cards</span>
                    {deck.forks > 0 && <span>{deck.forks} Forks</span>}
                </div>

                {variant === 'personal' && (
                    <>
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
                    </>
                )}
            </div>

            {/* Main Action Button */}
            {onSelect && deck.cardCount > 0 && variant === 'personal' && (
                <button
                    onClick={() => onSelect(deck._id)}
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
    );
}
