import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {
    CART_COUNT: number;
    addCount: () => void;
    removeCount: () => void;
}

const useCart = create<Store>()(
    immer((set) => ({
        CART_COUNT: 0,
        addCount: () =>
            set((state) => {
                state.CART_COUNT++;
            }),
        removeCount: () =>
            set((state) => {
                state.CART_COUNT--;
            }),
    }))
);

export default useCart;
