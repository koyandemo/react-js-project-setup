import { generateGtMsg, generateLeaseRequireMsg } from '@/utils';
import { z } from 'zod';

export type ProductCreateT = {
  name: string;
  price: number;
  categoryId: number;
  discountPrice: number;
  weight: number;
  description: string;
  customizeStatus: number;
  status: number;
  bannerImage: File;
  fontImage: File;
};

export const ProductSchema = z.object({
  name: z.string().min(3, { message: generateLeaseRequireMsg('Name', 3) }),
  price: z
    .number({ message: 'Price is requried !' })
    .gt(0, { message: generateGtMsg('Price', 0) }),
  categoryId: z.number({ message: 'Category is required !' }),
  discountPrice: z.number().optional(),
  //discountPrice:z.number({message: "Discount Price is required !"}).gt(0,{message : generateGtMsg("Discount Price",0)}),
  weight: z
    .number({ message: 'Weight is required !' })
    .gt(0, { message: generateGtMsg('Weight', 0) }),
  description: z
    .string()
    .min(3, { message: generateLeaseRequireMsg('Description', 3) }),
  customizeStatus: z.number({ message: 'Customize Status is required !' }),
  status: z.number({ message: 'Status is required !' }),
  bannerImage: z
    .instanceof(File, { message: 'Banner Image is required !' })
    .or(z.string()),
  frontImage: z
    .instanceof(File, { message: 'Front Image is required !' })
    .or(z.string()),
  backImage: z
    .instanceof(File, { message: 'Back Image is required !' })
    .or(z.string()),
  fullImage: z
    .instanceof(File, { message: 'Full Image is required !' })
    .or(z.string()),
});
