import { VariationFilterT } from "@/types/variation";
import { apiConfig } from "./apiConfig";


export const getVariations = async (page: number, data: VariationFilterT) => {
    const res = await apiConfig.post(`/variation-type-list?page=${page}`, { ...data });
    return res;
  };

export const getVariation = async (data:FormData) => {
  const res = await apiConfig.post(`/variation-type-detail`,data);
  return res;
}  
  
export const postVariation = async (data:FormData) => {
    const res = await apiConfig.post('/variation-type-store',data);
    return res;
}  

export const editVariation = async (data:FormData) => {
  const res = await apiConfig.post('/variation-type-update',data);
  return res;
}

export const deleteVariation = async (id:number) => {
 const res = await apiConfig.get(`/variation-type-delete?id=${id}`)
 return res;
}