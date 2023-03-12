export interface ProductPost {
    id?: string,
    name: string,
    category: string,
    type: string,
    image: string,
    brand: string,
    amount: number,
    price: number,
    currency: string,
    productCode?: string,
    year?: number,
    collectionName: string,
    designer?: string,
    isOSale: boolean,
    sale?: number
}
