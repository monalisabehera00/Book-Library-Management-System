import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetching products by collection and filters
export const fetchProductsByFilters = createAsyncThunk('products/fetchByFilters', async ({ collection ,category, rating, availability, brands, producttype, minPrice, maxPrice, sortBy, search,limit }) => {
    const query = new URLSearchParams();
    if (collection) query.append('collection', collection);
    if (category) query.append('category', category);
    if (rating) query.append('rating', rating);
    if (availability) query.append('availability', availability);
    if (brands) query.append('brands', brands);
    if (producttype) query.append('producttype', producttype);
    if (minPrice) query.append('minPrice', minPrice);
    if (maxPrice) query.append('maxPrice', maxPrice);
    if (sortBy) query.append('sortBy', sortBy);
    if (search) query.append('search', search);
    if (limit) query.append('limit', limit);

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`);
    return response.data;
});

// Async thunk to fetch single product by id
export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async ({id}) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
    return response.data;  
});

// Async thunk to fetch similar products 
export const updateProduct = createAsyncThunk('products/updateProduct', async ({id, productData}) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        }
    });
    return response.data;
});

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk('products/fetchSimilarProducts', async ({id}) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);
    return response.data;   
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null, // Store the selected product
        similarProducts: [], // Store similar products
        loading: false,
        error: null,
        filters: {
            collection: "",
            category: "",
            rating: "",
            availability: "",
            brands: "",
            producttype: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            limit: ""            
        },
    }, 
    reducers: {
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload};
        }, 
    clearFilters: (state) => {
        state.filters = {
            collection: "",
            category: "",
            rating: "",
            availability: "",
            brands: "",
            producttype: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            limit: ""
        };
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];   
            })
           .addCase(fetchProductsByFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }) 
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
           .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
           .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
           // Handle updating a product
           .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
          .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex((product) => product._id === updatedProduct._id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetching similar products
           .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
          .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts= action.payload;
            })
          .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },             
});
export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;