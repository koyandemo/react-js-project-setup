import { SkuFilterT } from "@/types/sku";
import { apiConfig } from "./apiConfig"


export const getSkus = async (page:number,data:SkuFilterT) => {
    const res = await apiConfig.post(`/sku-list?page=${page}`,{...data});
    return res
}