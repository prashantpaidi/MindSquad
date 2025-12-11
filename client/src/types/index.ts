export interface Deck {
    _id: string;
    name: string;
    description: string;
    userId: string | { _id: string; username: string };
    cardCount: number;
    dueCount: number;
    isPublic: boolean;
    likes: string[];
    forks: number;
    origin?: string;
    likesCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface Card {
    _id: string;
    front: string;
    back: string;
    deckId: string;
    userId: string;
    nextReview: string;
    interval: number;
    easeFactor: number;
    reviewCount: number;
    lastReviewed: string | null;
    createdAt: string;
    updatedAt: string;
}

export type ReviewResponse = 'AGAIN' | 'HARD' | 'GOOD' | 'EASY';

