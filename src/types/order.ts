

export type OrderFilterT = {
    orderBy:"asc" | "desc",
    sortKey:"created_at",
    limit:number;
    name:string;
    email:string;
    phone:string;
    fromDate:string;
    toDate:string;
    orderStatus:string;
    status:string;
    userId:string;
    orderNo:string;
}

export type OrderInfoT =  {
    id:number;
    name:string;
    job:string;
    image:string;
    product:string;
    quantity:number;
    skuCode:number;
    status:number;
    url:string;
    variation:string;
    variationId:number;
    activateStatus:boolean;
    backImage:string;
    frontImage:string;
    customizeStatus:number;
    date:string;
    price:number;
}

export type OrderT = {
    id:number;
    orderNo:string;
    name:string;
    email:string;
    phone:string;
    address1:string;
    address2:string;
    city:string;
    postal_code:string;
    status:number;
    quantity:number;
    orderInfo:OrderInfoT[];
    total_price:number;
    discountPrice:number;
    deliveryPrice:number;
    vat:number;
    orderDate:string;
    date:string;
    price:string;
}