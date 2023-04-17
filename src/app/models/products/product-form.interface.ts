export interface Dimensions {
    height: number,
    width?: number,
    depth?: number,
    diameter?: number,
    measurementUnits: string,
};

export interface Price {
    fullPrice: number,
    currency: string,
    isOnSale: boolean,
    discount?: number
    discountedPrice?: number,
}

export interface Details {
    collectionName: string,
    shape: string,
    materials: string[],
    extras: string[],
    productCode?: string,
    year?: number,
}

export interface ProductForm {
    id?: string,
    category: string,
    type: string,
    image: string,
    brand: string,
    dimensions: Dimensions,
    price: Price,
    details: Details,
    inStock: number
}
