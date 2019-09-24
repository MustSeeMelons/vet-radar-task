import _ from "lodash";
import { State } from "../store/store";

export const isUserLoggedIn = (state: State) => {
    return !_.isEmpty(state.globalReducer.userId);
}
