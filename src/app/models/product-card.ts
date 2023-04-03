export interface ProductCard {
    id?: string,
    _id: string,
    category: string,
    type: string,
    brand: string,
    collectionName: string,
    material: string,
    price: ProductPrice,
    currency: string,
    imagePath: string,
    isOnSale: boolean,
    additionalInfo: ProdAdditionalInfo,
    total: number
}

export interface ProductPrice {
    amount: number,
    currency: string
}

export interface ProdAdditionalInfo {
    isOnSale: boolean,
    sale?: number
}
