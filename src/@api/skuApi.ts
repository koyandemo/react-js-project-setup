import { SkuFilterT } from '@/types/sku';
import { apiConfig } from './apiConfig';

export const getSkus = async (page: number, data: SkuFilterT) => {
  const res = await apiConfig.post(`/sku-list?page=${page}`, { ...data });
  return res;
};

export const postSku = async (data: FormData) => {
  const res = await apiConfig.post('/sku-store', data);
  return res;
};

export const getSku = async (data: unknown) => {
  const res = await apiConfig.post('/sku-detail', data);
  return res;
};

export const editSku = async (data:FormData) => {
  const res = await apiConfig.post('/sku-update',data);
  return res;
}

export const deleteSku = async (id: number) => {
  const res = await apiConfig.get(`/sku-delete?id=${id}`);
  return res;
};
