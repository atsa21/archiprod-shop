import { Details, Dimensions, Price } from "./product-form.interface"

export interface ProductListRes {
    data: ProductCard[],
    message: string,
    totalElements: number
}

export interface ProductRes {
    data: ProductCard,
    message: string
}

export interface ProductCard {
    id?: string,
    _id?: string,
    category: string,
    type: string,
    imagePath: string,
    brand: string,
    dimensions: Dimensions,
    price: Price,
    details: Details,
    total: number
}
