import { apiConfig } from "./apiConfig"
import { IconFilterT } from "@/types/icon";


export const getIcons = async (page:number,data:IconFilterT) => {
    const res = await apiConfig.post(`/icon-list?page=${page}`,{...data});
    return res
}

export const getIconCategorys = async (page:number,data:IconFilterT) => {
    const res = await apiConfig.post(`/icategory-list?page=${page}`,{...data});
    return res;
}

export const getIcon = async (data:unknown) => {
    const res =await apiConfig.post("/icon-detail",data);
    return res;
}

export const postIcon = async (data:unknown) => {
    const res = await apiConfig.post('/icon-store',data);
    return res;
}

export const editIcon = async (data:unknown) => {
    const res = await apiConfig.post('/icon-update',data);
    return res;
}

export const deleteIcon = async (id:number) => {
    const res = await apiConfig.get(`/icon-delete?id=${id}`);
    return res;
}