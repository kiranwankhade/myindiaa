import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/auth.reducer';
import cartReducer from './Cart/cart.reducer';
import productsReducer from './Products/product.reducer';
import wishlistReducer from './Wishlist/wishlist.reducer';
import ordersReducer from './Orders/order.reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});

export default store;