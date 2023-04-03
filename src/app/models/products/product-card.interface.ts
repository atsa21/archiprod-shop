export interface ProductRes {
    data: ProductCard[],
    message: string,
    totalElements: number
}

export interface ProductCard {
    id?: string,
    _id?: string,
    category: string,
    type: string,
    imagePath: string,
    brand: string,
    productCode?: string;
    price: ProductPrice,
    additionalInfo: ProdAdditionalInfo,
    total: number
}

export interface ProductPrice {
    amount: number,
    currency: string
}

export interface ProdAdditionalInfo {
    materials: string[],
    shape: string,
    extras: string[],
    year?: number,
    collectionName: string,
    designer?: string;
    isOnSale: boolean,
    sale?: number
}
