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
        case GlobalActionTypes.SET_CONTROLS:
            if (state.lockControls !== action.payload.value) {
                return {
                    ...state,
                    lockControls: action.payload.value
                }
            }
            return state;
        case GlobalActionTypes.SET_ERR: {
            if (state.err !== action.payload.err) {
                return {
                    ...state,
                    err: action.payload.err
                }
            }
            return state;
        }
        default:
            return state;
    }
}