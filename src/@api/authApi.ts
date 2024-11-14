import { LoginUserT } from '@/types/schema/authSchema';
import { apiConfig } from './apiConfig';

export const login = async (data: LoginUserT) => {
    const res = await apiConfig.post('/login', data);
    return res
};
