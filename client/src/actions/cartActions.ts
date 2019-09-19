import { IItem } from "../../../_models/item";

export enum CartActionTypes {
    ADD = "ADD",
    REMOVE = "REMOVE",
    GET = "GET"
}

/**
 * @description Cart item add action interface
 * @export
 * @interface IAddItemToCart
 */
export interface IAddItemToCart { type: CartActionTypes.ADD, payload: { item: IItem } }

/**
 * @description Returns an add cart item action
 * @param {IItem} item 
 */
export const addItemToCartActionCreator = (item: IItem): IAddItemToCart => {
    return {
        type: CartActionTypes.ADD,
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
export interface IRemoveItemFromCart { type: CartActionTypes.REMOVE, payload: { userId: string, itemName: string } }

/**
 * @description Returns an set categories action
 * @param
 */
// TODO fix param
export const removeItemFromCartActionCreator = (param: any): IRemoveItemFromCart => {
    return {
        type: CartActionTypes.REMOVE,
        payload: param
    }
}