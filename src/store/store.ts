import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {
    USER_EMAIL: string;
    addUser: (payload: { email: string }) => void;
    removeUser: () => void;
}

const useUser = create<Store>()(
    immer((set) => ({
        USER_EMAIL: "",
        addUser: (payload: { email: string }) =>
            set((state) => {
                state.USER_EMAIL = payload.email;
            }),
        removeUser: () =>
            set((state) => {
                state.USER_EMAIL = "";
            }),
    }))
);

export default useUser;
