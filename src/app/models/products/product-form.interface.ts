export interface ProductForm {
    id?: string,
    category: string,
    type: string,
    materials: string[],
    shape: string,
    extras: string[],
    image: string,
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
