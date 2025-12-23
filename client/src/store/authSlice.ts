import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface User {
    userId: string;
    username: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
}

const getInitialState = (): AuthState => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Validate strict JSON parsing
    let parsedUser: User | null = null;
    if (user) {
        try {
            parsedUser = JSON.parse(user);
        } catch (e) {
            console.error('Invalid user data in localStorage');
        }
    }

    return {
        user: parsedUser,
        token: token || null,
    };
};

const slice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setCredentials: (
            state,
            { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = user;
            state.token = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setCredentials, logOut } = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default slice.reducer;
