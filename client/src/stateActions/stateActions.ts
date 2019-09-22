import { store } from "../store/store";
import { itemApi, cartApi } from "../api/api";
import { setItemsActionCreator } from "../actions/itemActions";
import { getUserId, UTILS, setUserId } from "../util/storage";
import { setUserIdActionCreator } from "../actions/globalActions";
import { IItem } from "../../../_models/item";
import { setCartActionCreator } from "../actions/cartActions";
import { ICart } from "../../../_models/cart";
import { async } from "q";

/**
 * FIXME: A good place of Redux Thunk?
 * Holds actions that many componets may need, like loading some resource.
 */
const stateActions = {
    loadItems: async (): Promise<void> => {
        const listResponse: any = await itemApi.fetchItems();
        store.dispatch(setItemsActionCreator(listResponse.items));
    },
    handleSessionSetup: () => {
        let userId = getUserId();
        if (!userId) {
            userId = UTILS.generateUserId();
            setUserId(userId);
        }

        store.dispatch(setUserIdActionCreator(userId));
    },
    getCart: async (userId: string) => {
        try {
            const cart = await cartApi.getCart(userId) as ICart;
            if (cart) {
                store.dispatch(setCartActionCreator(cart));
            }
        } catch (e) {
            // show err info
        }

    },
    addItemToCart: async (userId: string, item: IItem) => {
        try {
            await cartApi.addToCart(userId, item);
        } catch (e) {
            // show err info
        }
    },
    removeItemFromCaer: async (userId: string, item: IItem) => {
        try {
            await cartApi.removeFromCart(userId, item);
        } catch (e) {
            // show err info
        }
    }
}

export { stateActions };