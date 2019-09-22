import { globalInitialState, GlobalState } from "../store/store";
import { Action } from "../actions";
import { GlobalActionTypes } from "../actions/globalActions";

export const globalReducer = (state: GlobalState = globalInitialState, action: Action) => {
    switch (action.type) {
        case GlobalActionTypes.SET_USER_ID:
            return {
                ...state,
                userId: action.payload.userId
            }
        default:
            return state;
    }
}