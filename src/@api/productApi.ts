import { apiConfig } from "./apiConfig"
import { ProductFilterT } from "@/types/product";


export const getProducts = async (page:number,data:ProductFilterT) => {
    const res = await apiConfig.post(`/product-list?page=${page}`,{...data});
    return res
}