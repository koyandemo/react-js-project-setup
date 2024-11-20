import { generateLeaseRequireMsg } from "@/utils";
import { z } from "zod";


export const VariationSchema = z.object({
    name: z
      .string()
      .min(3, { message: generateLeaseRequireMsg('Name', 3) }),
  });