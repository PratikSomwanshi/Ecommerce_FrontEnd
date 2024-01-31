import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {
    CART_COUNT: number;
    CART: number;
    USER_EMAIL: string;
    addCount: () => void;
    removeCount: () => void;
    setCount: (payload: { count: number }) => void;
    setCartCount: (payload: { count: number }) => void;
    addUserEmail: (payload: { email: string }) => void;
    removeUserEmail: () => void;
}

const useCart = create<Store>()(
    immer((set) => ({
        USER_EMAIL: "ram@ram.com",
        CART_COUNT: 0,
        CART: 0,
        addCount: () =>
            set((state) => {
                state.CART_COUNT++;
            }),
        removeCount: () =>
            set((state) => {
                state.CART_COUNT--;
            }),
        setCount: (payload) =>
            set((state) => {
                state.CART_COUNT = payload.count;
            }),
        setCartCount: (payload) =>
            set((state) => {
                state.CART = payload.count;
            }),
        addUserEmail: (payload) =>
            set((state) => {
                state.USER_EMAIL = payload.email;
            }),
        removeUserEmail: () =>
            set((state) => {
                state.USER_EMAIL = "";
            }),
    }))
);

export default useCart;
