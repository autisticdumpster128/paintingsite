export type Painting={
    id:number;
    title:string;
    size:string;
    price:number;
    sold:boolean;
};

export const paintings: Painting[]=[
    {id:1,title:"a",price:500, size:"100x80", sold:false}, 
    {id:2,title:"b",price:200, size:"50x50", sold:false}, 
    {id:3,title:"c",price:300, size:"60x80", sold:false}
];
export function getStatus(painting: Painting): string{
    return painting.sold? "sold":"available";
};