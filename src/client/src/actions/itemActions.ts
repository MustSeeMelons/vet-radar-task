import { IItem } from "../../../_models/item";

export enum ItemActionTypes {
    SET = "SET"
}

/**
 * @description Item set action interface
 * @export
 * @interface ISetItems
 */
export interface ISetItems { type: ItemActionTypes.SET, payload: { items: IItem[] } }

/**
 * @description Returns an item set action
 * @param items 
 */
export const setItemsActionCreator = (items: IItem[]): ISetItems => {
    return {
        type: ItemActionTypes.SET,
        payload: {
            items
        }
    }
}