import { OrderFilterT } from "@/types/order";
import { apiConfig } from "./apiConfig";


export const getOrders = async (page:number,data:OrderFilterT) => {
    const res = await apiConfig.post(`/order-list?page=${page}`,{...data});
    return res
}

export const getOrder = async (data:unknown) => {
    const res = await apiConfig.post('/order-detail',data);
    return res;
}

export const updateOrder = async (data:unknown) => {
    const res = await apiConfig.post("/order-status-changing",data);
    return res;
}

export const deleteOrder = async (id:number) => {
    const res = await apiConfig.get(`/order-delete?id=${id}`);
    return res;
}