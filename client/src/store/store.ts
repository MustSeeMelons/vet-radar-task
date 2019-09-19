import { createStore, combineReducers, applyMiddleware } from "redux";
import { itemReducer } from "../reducers/itemReducer";
import { globalReducer } from "../reducers/globalReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { IItem } from "../../../_models/item";

// Global store definitions
export interface ItemState {
    items: IItem[]
}

export interface GlobalState {

}

export interface State {
    itemReducer: ItemState;
    globalReducer: GlobalState;
}

// Initial states for our states
export const itemInitialState: ItemState = {
    items: []
}

export const globalInitialState: GlobalState = {

}

/* eslint-disable no-underscore-dangle */
export const store = createStore(
    combineReducers({
        itemReducer,
        globalReducer
    }),
    composeWithDevTools(
        applyMiddleware(),
    )
);
/* eslint-enable */