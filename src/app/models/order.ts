import { Client } from "./user/client.interface";

export interface Order {
    client: Client,
    shop: string,
    order: OrderItem[],
    comment: string,
    totalPrice: number
}

export interface OrderItem {
    name: string,
    itemCode : string,
    price: ItemPrice,
    amount: number
}

export interface ItemPrice {
    finalPrice: number,
    currency: string
}