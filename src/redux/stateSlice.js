import { createSlice } from '@reduxjs/toolkit';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from './store';
const KEY_FULLNAME = 'FULLNAME';
const USER_ID = 'USER_ID';
const EMAIL = 'EMAIL';

const stateSlice = createSlice({
    name: 'state',
    initialState: { fullname: localStorage.getItem(KEY_FULLNAME), userId: localStorage.getItem(USER_ID), email: localStorage.getItem(EMAIL) },
    reducers: {
        signIn: (state, action) => {
            const { fullname, userId, email } = action.payload;
            localStorage.setItem(KEY_FULLNAME, fullname);
            localStorage.setItem(USER_ID, userId);
            localStorage.setItem(EMAIL, email);
            return {fullname, userId, email};
        },
        signOut: (state, action) => {
            localStorage.removeItem(KEY_FULLNAME);
            localStorage.removeItem(USER_ID);
            return {};
        }
    }
});

onAuthStateChanged(getAuth(), (user) => {
    if (user) {
        store.dispatch(signIn({ fullname: user.displayName, userId: user.uid, email: user.email }));
    } else {
        store.dispatch(signOut());
    }
});

export const { signIn, signOut } = stateSlice.actions;
export default stateSlice.reducer;


