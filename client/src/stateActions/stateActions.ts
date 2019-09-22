import { store } from "../store/store";
import { itemApi, cartApi } from "../api/api";
import { setItemsActionCreator } from "../actions/itemActions";
import { getUserId, UTILS, setUserId } from "../util/localStorage";
import { setUserIdActionCreator, setControlsActionCreator, setErrActionCreator } from "../actions/globalActions";
import { IItem } from "../../../_models/item";
import { setCartActionCreator } from "../actions/cartActions";
import { ICart } from "../../../_models/cart";

/**
 * FIXME: A good place of Redux Thunk?
 * Holds actions that many componets may need, like loading some resource.
 */
const stateActions = {
    loadItems: async (): Promise<void> => {
        try {
            store.dispatch(setControlsActionCreator(true));
            const listResponse: any = await itemApi.fetchItems();
            store.dispatch(setItemsActionCreator(listResponse.items));
            store.dispatch(setErrActionCreator());
        } catch (e) {
            store.dispatch(setErrActionCreator(true));
        } finally {
            store.dispatch(setControlsActionCreator());
        }

    },
    handleSessionSetup: (): void => {
        let userId = getUserId();
        if (!userId) {
            userId = UTILS.generateUserId();
            setUserId(userId);
        }

        store.dispatch(setUserIdActionCreator(userId));
    },
    getCart: async (userId: string): Promise<void> => {
        try {
            store.dispatch(setControlsActionCreator(true));
            const cart = await cartApi.getCart(userId) as ICart;
            if (cart) {
                store.dispatch(setCartActionCreator(cart));
            }
            store.dispatch(setErrActionCreator());
        } catch (e) {
            store.dispatch(setErrActionCreator(true));
        } finally {
            store.dispatch(setControlsActionCreator());
        }

    },
    addItemToCart: async (userId: string, item: IItem): Promise<void> => {
        try {
            store.dispatch(setControlsActionCreator(true));
            await cartApi.addToCart(userId, item);
            store.dispatch(setErrActionCreator());
        } catch (e) {
            store.dispatch(setErrActionCreator(true));
        } finally {
            store.dispatch(setControlsActionCreator());
        }
    },
    removeItemFromCaer: async (userId: string, item: IItem): Promise<void> => {
        try {
            store.dispatch(setControlsActionCreator(true));
            await cartApi.removeFromCart(userId, item);
            store.dispatch(setErrActionCreator());
        } catch (e) {
            store.dispatch(setErrActionCreator(true));
        } finally {
            store.dispatch(setControlsActionCreator());
        }
    }
}

export { stateActions };