import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {
    CART_COUNT: number;
    USER_EMAIL: string;
    addCount: () => void;
    removeCount: () => void;
    addUserEmail: (payload: { email: string }) => void;
    removeUserEmail: () => void;
}

const useCart = create<Store>()(
    immer((set) => ({
        USER_EMAIL: "ram@ram.com",
        CART_COUNT: 0,
        addCount: () =>
            set((state) => {
                state.CART_COUNT++;
            }),
        removeCount: () =>
            set((state) => {
                state.CART_COUNT--;
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
