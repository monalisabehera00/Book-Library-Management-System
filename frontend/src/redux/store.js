import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminOrderSlice"; 
import adminProductReducer from "./slices/adminProductsSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
import useReducer from "./slices/userSlice";

const store = configureStore({
   reducer: {
         auth: authReducer,
         products: productReducer,
         cart: cartReducer,
         checkout: checkoutReducer,
         orders: orderReducer,
         admin: adminReducer,
         adminProducts: adminProductReducer,
         adminOrders: adminOrderReducer,
         // admin: adminReducer,
         // user: useReducer,


    }
 });
export default store;