import { CategoryFilterT } from "@/types/category";
import { apiConfig } from "./apiConfig"


export const getCategories = async (page:number,data:CategoryFilterT) => {
    const res = await apiConfig.post(`/category-list?page=${page}`,{...data});
    return res
}

export const getCategory = async (data:unknown) => {
    const res =await apiConfig.post("/icon-detail",data);
    return res;
}

export const postCategory = async (data:unknown) => {
    const res = await apiConfig.post('/category-store',data);
    return res;
}

export const editCategory = async (data:unknown) => {
    const res = await apiConfig.post('/category-update',data);
    return res;
}

export const deleteCategory = async (id:number) => {
    const res = await apiConfig.get(`/category-delete?id=${id}`);
    return res;
}