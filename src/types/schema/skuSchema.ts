import { generateLeaseRequireMsg } from '@/utils';
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

export const SkuSchema = z.object({
  skuCode: z
    .string()
    .min(3, { message: generateLeaseRequireMsg('Sku code', 3) }),
  productId: z.number({ message: 'Product is required !' }),
  variationId: z.number({ message: 'Variation is required !' }),
  description: z
    .string()
    .min(3, { message: generateLeaseRequireMsg('Description', 3) }),
  image1: z
    .instanceof(File, { message: 'Image 1 is required !' })
    .or(z.string()),
  image2: z
    .instanceof(File, { message: 'Image 2 is required !' })
    .or(z.string()),
  image3: z
    .instanceof(File, { message: 'Image 3 is required !' })
    .or(z.string()),
  image4: z
    .instanceof(File, { message: 'Image 4 is required !' })
    .or(z.string()),
});
