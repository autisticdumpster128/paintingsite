export type PaintingType = {
    id: number;
    title: string;
    height: number;
    width: number;
    price: number;
    sold: boolean;
    image: string;
};

export const paintingList: PaintingType[] = [
    { id: 1, title: "a", price: 500, height: 80, width: 90, sold: false, image: "/paintings/1.jpg" },
    { id: 2, title: "b", price: 200, height: 75, width: 70, sold: true, image: "/paintings/2.jpg" },
    { id: 3, title: "c", price: 300, height: 110, width: 80, sold: false, image: "/paintings/3.jpg" },
    { id: 4, title: "d", price: 400, height: 70, width: 50, sold: false, image: "/paintings/4.jpg" },
    { id: 5, title: "e", price: 600, height: 70, width: 50, sold: false, image: "/paintings/5.jpg" },
    { id: 6, title: "f", price: 600, height: 40, width: 25, sold: false, image: "/paintings/6.jpg" },
    { id: 7, title: "g", price: 600, height: 100, width: 75, sold: false, image: "/paintings/7.jpg" },
    { id: 8, title: "h", price: 600, height: 75, width: 110, sold: false, image: "/paintings/8.jpg" },
];
export function getStatus(painting: PaintingType): string {
    return painting.sold ? "sold" : "available";
};

export function formatPrice(price: number): string {
    return price + "$";
};

export function getRatio(painting: PaintingType): number {
    return (painting.width / painting.height)
};

const CELL_RATIO = 0.9;

export function getFill(painting: PaintingType): number {
    const ratio = getRatio(painting);
    const cellRatio= isWide(painting)? CELL_RATIO*2:CELL_RATIO;

    if (ratio < cellRatio) {
        return ratio / cellRatio;
    } else {
        return cellRatio / ratio;
    }
};

export function isWide(painting: PaintingType):boolean{

    const ratio=getRatio(painting);
    if (ratio>CELL_RATIO) {
        return true;
    } else {
        return false;  
    }
};