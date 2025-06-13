import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to load cart items from local storage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { products: []};
};
// Helper function to save cart items to local storage
const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Fetch cart for a user or a guest
export const fetchCart = createAsyncThunk('cart/fetchCart', async ({userId, guestId}, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
            {
                params: {
                    userId: userId,
                    guestId: guestId
                } 
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return rejectWithValue(error.response.data);
    }
});

// Add a product to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({userId, guestId, productId, quantity}, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
                userId: userId,
                guestId: guestId,
                productId: productId,
                quantity: quantity
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return rejectWithValue(error.response.data);
    }
});

// Update the quantity of a product in the cart
export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({userId, guestId, productId, quantity}, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
                productId,
                quantity,
                userId,
                guestId
            } 
        );
        return response.data;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        return rejectWithValue(error.response.data); 
    } 
});

// Remove a product from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({userId, guestId, productId}, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data: {
                productId,
                userId,
                guestId
            }
        });
        return response.data;
        
    } catch (error) {
        console.error('Error removing from cart:', error);
        return rejectWithValue(error.response.data);
    }
});

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk('cart/mergeCart', async ({userId, guestId}, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
            {
                userId,
                guestId
            },
            {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('userToken')}` 
            }
        }
        ); 
        return response.data;
    }catch (error) {
        console.error('Error merging cart:', error);
        return rejectWithValue(error.response.data); 
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState:{ 
        cart:loadCartFromStorage(), 
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: []};
            localStorage.removeItem('cart');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            }) 
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart';
            })
           .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
           .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to add to cart';
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
           .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
          .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update cart item quantity';
            })
           .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
          .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
         .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to remove from cart';
            })
          .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
         .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
         .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to merge cart'; 
         })         
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
