import { globalInitialState, GlobalState } from "../store/store";
import { Action } from "../actions";

export const globalReducer = (state: GlobalState = globalInitialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}