import { store } from "../store/store";
import { itemApi } from "../api/api";
import { setItemsActionCreator } from "../actions/itemActions";

/**
 * FIXME: A good place of Redux Thunk?
 * Holds actions that many componets may need, like loading some resource.
 */
const stateActions = {
    loadItems: async (): Promise<void> => {
        const listResponse: any = await itemApi.fetchItems();
        store.dispatch(setItemsActionCreator(listResponse.items));
    }
}

export { stateActions };