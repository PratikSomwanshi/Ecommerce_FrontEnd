import { create } from "zustand";

interface Store {
    accessToken: null | string;
}

const useToken = create<Store>()((set) => ({
    accessToken: null,
}));

export default useToken;
