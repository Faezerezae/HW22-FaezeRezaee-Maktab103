import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../components/Product';

interface CartState {
    cart: IProduct[];
    count: number;
}
const storedCartString = localStorage.getItem('cart');
const items =storedCartString !== null ? JSON.parse(storedCartString):[]

const storedCount = localStorage.getItem('count');
const initialCount = storedCount !== null ? parseInt(storedCount, 10) : 1;

const initialState: CartState = {
    cart:items,
    count: initialCount,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addtoCart: (state, action: PayloadAction<IProduct>) => {
      state.cart.push(action.payload);
      localStorage.setItem('cart',JSON.stringify(state.cart.map(item => item)))
        },
        removeFromCart: (state, action: PayloadAction<IProduct>) => {
            state.cart= state.cart.filter(item => item.id !== action.payload.id)
            localStorage.setItem('cart',JSON.stringify(state.cart.map(item => item)))
        },
        updateNum: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
            localStorage.setItem('count', action.payload.toString());
        },
    },
});

export const { addtoCart, removeFromCart,updateNum } = cartSlice.actions;
export default cartSlice.reducer;

