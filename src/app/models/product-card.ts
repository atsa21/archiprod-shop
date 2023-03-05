export interface ProductCard {
    id: number,
    brand: string,
    collection: string,
    type: {
        name: string,
        description: string
    },
    image: string,
    onSale: boolean
}
