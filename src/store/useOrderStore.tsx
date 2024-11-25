import { create } from 'zustand';

type OrderType = {
  orderStatus: number;
  isFetchAgain:boolean;
  setIsFetchAgain:(value:boolean) => void;
  setOrderStatus: (status: number) => void;
};

const useOrderStore = create<OrderType>((set) => ({
    orderStatus:0,
    isFetchAgain:false,
    setIsFetchAgain:(value:boolean) => set(() => ({isFetchAgain : value})),
    setOrderStatus:(status:number) => set(() => ({orderStatus:status}))
}));

export default useOrderStore;
