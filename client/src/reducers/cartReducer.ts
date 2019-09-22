import { CartState, cartInitialState } from "../store/store";
import { Action } from "../actions";
import { CartActionTypes } from "../actions/cartActions";

export const cartReducer = (state: CartState = cartInitialState, action: Action) => {
    switch (action.type) {
        case CartActionTypes.SET_CART:
            return {
                cart: action.payload.cart
            }
        default:
            return state;
    }
}