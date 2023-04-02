export interface ProductPost {
    id?: string,
    category: string,
    type: string,
    material: string,
    shape: string,
    extras: string,
    imagePath: string,
    brand: string,
    amount: number,
    price: number,
    currency: string,
    productCode?: string,
    year?: number,
    collectionName: string,
    designer?: string,
    isOnSale: boolean,
    sale?: number
}
