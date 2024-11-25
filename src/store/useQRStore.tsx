import { create } from 'zustand';

type QRType = {
  url:string;
  setUrl:(value:string) => void;
};

const useOrderStore = create<QRType>((set) => ({
    url:"",
    setUrl:(value:string) => set(() => ({url : value}))
}));

export default useOrderStore;
