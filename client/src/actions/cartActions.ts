import { ICart } from "../../../_models/cart";

export enum CartActionTypes {
    SET_CART = "SET_CART"
}

export interface ISetCart { type: CartActionTypes.SET_CART, payload: { cart: ICart } };

export const setCartActionCreator = (cart: ICart) => {
    return {
        type: CartActionTypes.SET_CART,
        payload: {
            cart
        }
    }
}