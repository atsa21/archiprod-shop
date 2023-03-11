export interface ProductCard {
    id?: string,
    brand: string,
    collection: string,
    type: {
        name: string,
        description: string
    },
    image: string,
    isOnSale: boolean
}
