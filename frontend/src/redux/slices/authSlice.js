import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//  Retrive user info from local storage if available
const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// Check for an existing guest ID in local storage or generate a new one
const initialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;

// Save the guest ID to local storage
localStorage.setItem('guestId', initialGuestId);

// Initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};
// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData); 
       localStorage.setItem('userInfo', JSON.stringify(response.data.user));
       localStorage.setItem('userToken', response.data.token);

       return response.data.user; // Return the user data from the response
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }    
});

// Async thunk for user registration
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData); 
       localStorage.setItem('userInfo', JSON.stringify(response.data.user));
       localStorage.setItem('userToken', response.data.token);

       return response.data.user; // Return the user data from the response
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }    
});

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {            
            state.user = null;
            state.guestId = `guest_${new Date().getTime()} `; // Reset the guest ID
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            localStorage.setItem('guestId', state.guestId); // Save the new guest ID to local storage
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()} `; // Generate a new guest ID
            localStorage.setItem('guestId', state.guestId); // Save the new guest ID to local storage
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred during login';
            })
           .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
           .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
           .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred during registration';
           })

        }
});

export const { logoutUser, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;