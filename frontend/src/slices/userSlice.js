import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
    blogs: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        }
    }
});

export const { login } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;