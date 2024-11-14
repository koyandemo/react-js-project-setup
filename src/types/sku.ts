
export type SkuFilterT ={
    orderBy:string;
    sortKey:string;
    limit:number;
    productId?:number
}

export type SkuT = {
    id:number;
    skuCode:string;
    variationId:number;
    variation:string;
    description:string;
    image1:string;
    image2:string;
    image3:string;
    image4:string;
    date:string;
}
