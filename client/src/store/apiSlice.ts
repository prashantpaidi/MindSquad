import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from './authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set('x-auth-token', token);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(logOut());
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Deck', 'Card'],
    endpoints: (builder) => ({
        getDecks: builder.query<any, void>({
            query: () => '/api/decks',
            providesTags: ['Deck'],
        }),
        // Auth Endpoints
        login: builder.mutation<any, any>({
            query: (credentials) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<any, any>({
            query: (credentials) => ({
                url: '/api/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        createDeck: builder.mutation<any, { name: string; description: string }>({
            query: (deck) => ({
                url: '/api/decks',
                method: 'POST',
                body: deck,
            }),
            invalidatesTags: ['Deck'],
        }),
        updateDeck: builder.mutation<any, { id: string; name: string; description: string }>({
            query: ({ id, ...patch }) => ({
                url: `/api/decks/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Deck'],
        }),
        deleteDeck: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/decks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Deck'],
        }),
        shareDeck: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/decks/${id}/share`,
                method: 'PUT',
            }),
            invalidatesTags: ['Deck'],
        }),
        // Card Endpoints
        getCards: builder.query<any, string>({
            query: (deckId) => `/api/cards/${deckId}`,
            providesTags: ['Card'],
        }),
        createCard: builder.mutation<any, { front: string; back: string; deckId: string }>({
            query: (card) => ({
                url: '/api/cards',
                method: 'POST',
                body: card,
            }),
            invalidatesTags: ['Card', 'Deck'], // Invalidate Deck to update card counts
        }),
        createCardsBulk: builder.mutation<any, { cards: { front: string; back: string }[]; deckId: string }>({
            query: (data) => ({
                url: '/api/cards/bulk',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Card', 'Deck'],
        }),
        updateCard: builder.mutation<any, { id: string; front: string; back: string }>({
            query: ({ id, ...patch }) => ({
                url: `/api/cards/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Card'],
        }),
        deleteCard: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/cards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Card', 'Deck'], // Invalidate Deck to update card counts
        }),
    }),
});

export const {
    useGetDecksQuery,
    useCreateDeckMutation,
    useUpdateDeckMutation,
    useDeleteDeckMutation,
    useShareDeckMutation,
    useGetCardsQuery,
    useLazyGetCardsQuery,
    useCreateCardMutation,
    useCreateCardsBulkMutation,
    useUpdateCardMutation,
    useDeleteCardMutation,
    useLoginMutation,
    useRegisterMutation,
} = apiSlice;
