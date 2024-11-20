import { OrderFilterT } from "@/types/order";
import { apiConfig } from "./apiConfig";


export const getOrders = async (page:number,data:OrderFilterT) => {
    const res = await apiConfig.post(`/order-list?page=${page}`,{...data});
    return res
}