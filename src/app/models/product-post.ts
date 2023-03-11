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
    collection?: string,
    designer?: string,
    onSale: boolean
}
