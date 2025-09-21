import { create } from 'zustand';

const useTokenStore = create((set) => ({
    token: '',
    setToken: (text) => { set({token: text}) }
}));

export default useTokenStore;