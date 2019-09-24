import { itemInitialState, ItemState } from "../store/store";
import { Action } from "../actions";
import { ItemActionTypes } from "../actions/itemActions";

export const itemReducer = (state: ItemState = itemInitialState, action: Action) => {
    switch (action.type) {
        case ItemActionTypes.SET:
            return {
                items: action.payload.items
            }
        default:
            return state;
    }
}