export type PaintingType = {
    id: number;
    title: string;
    size: string;
    price: number;
    sold: boolean;
    image: string;
};

export const paintingList: PaintingType[] = [
    { id: 1, title: "a", price: 500, size: "100x80", sold: false, image: "/paintings/1.jpg" },
    { id: 2, title: "b", price: 200, size: "50x50", sold: true, image: "/paintings/2.jpg" },
    { id: 3, title: "c", price: 300, size: "60x80", sold: false, image: "/paintings/3.jpg" },
    { id: 4, title: "d", price: 400, size: "60x80", sold: false, image: "/paintings/4.jpg" },
    { id: 5, title: "e", price: 600, size: "60x80", sold: false, image: "/paintings/5.jpg" }
];
export function getStatus(painting: PaintingType): string {
    return painting.sold ? "sold" : "available";
};
export function formatPrice(price: number): string {
    return price + "$";
}