import { createStore, combineReducers, applyMiddleware } from "redux";
import { itemReducer } from "../reducers/itemReducer";
import { globalReducer } from "../reducers/globalReducer";
import { cartReducer } from "../reducers/cartReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { IItem } from "../../../_models/item";
import { ICart } from "../../../_models/cart";

// Global store definitions
export interface ItemState {
    items: IItem[]
}

export interface CartState {
    cart: ICart;
}

export interface GlobalState {
    userId: string;
    lockControls: boolean;
    err: boolean;
}

export interface State {
    itemReducer: ItemState;
    globalReducer: GlobalState;
    cartReducer: CartState;
}

// Initial states for our states
export const itemInitialState: ItemState = {
    items: []
}

export const globalInitialState: GlobalState = {
    userId: "",
    lockControls: false,
    err: false
}

export const cartInitialState: CartState = {
    cart: { userId: "", itemQuantities: [] }
}

/* eslint-disable no-underscore-dangle */
export const store = createStore(
    combineReducers({
        itemReducer,
        globalReducer,
        cartReducer
    }),
    composeWithDevTools(
        applyMiddleware(),
    )
);
/* eslint-enable */