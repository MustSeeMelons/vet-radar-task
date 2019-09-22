import _ from "lodash";
import { State } from "../store/store";
import { IItem } from "../../../_models/item";
import { ICart, ICartItemQuantity } from "../../../_models/cart";

// FIXME: use reselect?
export const isItemsLoaded = (state: State) => {
    return !_.isEmpty(state.itemReducer.items)
}

export const isItemInCart = (item: IItem, cart?: ICart) => {
    if (cart) {
        return !!cart.itemQuantities.find((itemQuantities: ICartItemQuantity) => {
            return itemQuantities.item.itemName === item.itemName;
        })
    }

    return false;
}