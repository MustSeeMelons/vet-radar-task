import { IItem } from "./item";

export interface ICartItemQuantity {
    quantity: number;
    item: IItem;
}

export interface ICart {
    userId: string;
    itemQuantities: ICartItemQuantity[];
    totalPrice?: string; // Calculated only when fetchig the cart
}