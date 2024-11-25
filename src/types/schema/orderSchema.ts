import { generateGtMsg, generateLeaseRequireMsg } from "@/utils";
import { z } from "zod";


export const OrderStatusSchema = z.object({
    status: z
    .number({ message: 'Status  is requried !' })
    .gt(0, { message: generateGtMsg('Status', 0) }), 
    shippingDate:z.string().min(3,generateLeaseRequireMsg("ShippingDate",3)),
    // shippingDate:z.date({message : "ShippingDate is requried !"}),
    carrierName:z.string().optional(),
    trackingNo:z.string().optional(),
    // carrierName:z.string().min(3,generateLeaseRequireMsg("Name",3)).optional(),
    // trackingNo:z.string().min(3,generateLeaseRequireMsg("Tracking Number",3)).optional(),
  });