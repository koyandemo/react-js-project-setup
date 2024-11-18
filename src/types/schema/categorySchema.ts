import { generateLeaseRequireMsg } from "@/utils";
import { z } from "zod";


export const CategorySchema = z.object({
    name:z.string().min(3,generateLeaseRequireMsg("Name",3)),
    image:z.instanceof(File,{message: "Image is required !"}).or(z.string().optional())
  });z.string().optional()