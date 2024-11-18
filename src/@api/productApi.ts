import { apiConfig } from "./apiConfig"
import { ProductFilterT } from "@/types/product";


export const getProducts = async (page:number,data:ProductFilterT) => {
    const res = await apiConfig.post(`/product-list?page=${page}`,{...data});
    return res
}

export const getProduct = async (data:unknown) => {
   const res = await apiConfig.post("/product-detail",data);
   return res;
}

export const postProduct = async (data:FormData) => {
    const res = await apiConfig.post('/product-store',data);
    return res;
}

export const deleteProduct = async (id:number) => {
    const res = await apiConfig.get(`/product-delete?id=${id}`);
    return res;
}