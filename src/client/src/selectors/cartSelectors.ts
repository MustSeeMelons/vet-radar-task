import _ from "lodash";
import { State } from "../store/store";

export const isCartLoaded = (state: State) => {
    return !_.isEmpty(state.cartReducer.cart.userId);
}

export const isCartEmpty = (state: State) => {
    if (state.cartReducer.cart) {
        return _.isEmpty(state.cartReducer.cart.itemQuantities);
    }
    return true;
}