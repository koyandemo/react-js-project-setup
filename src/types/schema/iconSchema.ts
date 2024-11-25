import { generateGtMsg, generateLeaseRequireMsg } from "@/utils";
import { z } from "zod";


export const IconSchema = z.object({
    iconCategoryId: z
    .number({ message: 'Icon Category is requried !' })
    .gt(0, { message: generateGtMsg('Icon Category', 0) }), 
    name:z.string().min(3,generateLeaseRequireMsg("Name",3)),
    image:z.instanceof(File,{message: "Image is required !"}).or(z.string()),
    layout1Image:z.instanceof(File,{message: "Layout 1 is required !"}).or(z.string()),
    layout2Image:z.instanceof(File,{message: "Layout 2 is required !"}).or(z.string()),
    layout3Image:z.instanceof(File,{message: "Layout 3 is required !"}).or(z.string())
  });