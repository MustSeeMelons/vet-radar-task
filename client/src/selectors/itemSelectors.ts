import _ from "lodash";
import { State } from "../store/store";

// TODO use reselect?
export const isItemsLoaded = (state: State) => {
    return !_.isEmpty(state.itemReducer.items)
}
