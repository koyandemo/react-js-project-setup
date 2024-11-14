import { CategoryFilterT } from "@/types/category";
import { apiConfig } from "./apiConfig"


export const getCategories = async (page:number,data:CategoryFilterT) => {
    const res = await apiConfig.post(`/category-list?page=${page}`,{...data});
    return res
}