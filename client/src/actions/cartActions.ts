import { IItem } from "../../../_models/item";
import { ICart } from "../../../_models/cart";

export enum CartActionTypes {
    ADD_ITEM = "ADD_ITEM",
    REMOVE_ITEM = "REMOVE_ITEM",
    SET_CART = "SET_CART"
}

/**
 * @description Cart item add action interface
 * @export
 * @interface IAddItemToCart
 */
export interface IAddItemToCart { type: CartActionTypes.ADD_ITEM, payload: { item: IItem } };

/**
 * @description Returns an add cart item action
 * @param {IItem} item 
 */
export const addItemToCartActionCreator = (item: IItem): IAddItemToCart => {
    return {
        type: CartActionTypes.ADD_ITEM,
        payload: {
            item: item
        }
    }
}

/**
 * @description Cart item remove action interface
 * @export
 * @interface IRemoveItemFromCart
 */
export interface IRemoveItemFromCart { type: CartActionTypes.REMOVE_ITEM, payload: { userId: string, itemName: string } };

/**
 * @description Returns an set categories action
 * @param
 */
// TODO fix param
export const removeItemFromCartActionCreator = (param: any): IRemoveItemFromCart => {
    return {
        type: CartActionTypes.REMOVE_ITEM,
        payload: param
    }
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