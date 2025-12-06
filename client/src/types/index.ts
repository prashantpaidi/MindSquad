export interface Deck {
    _id: string;
    name: string;
    description: string;
    userId: string;
    cardCount: number;
    dueCount: number;
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

