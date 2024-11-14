
export type ProductT = {
    id:number;
    name:string;
    categoryId:number;
    categoryName:string;
    customizeStatus:number;
    status:number;
    price:number;
    discountPrice:number;
    weight:string;
    description:string;
    bannerImage:string;
    date:string;
}

export type ProductFilterT = {
    orderBy:string;
    sortKey:string;
    limit:number;
    categoryId:string;
    name:string;
}