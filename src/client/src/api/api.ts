import Axios, { AxiosRequestConfig } from "axios";
import { URLS } from "./apiConfig";
import { ICart } from "../../../_models/cart";
import { IItem } from "../../../_models/item";
import { IItemListResponse } from "../../../_responses/itemListResponse";

const axiosConfig: AxiosRequestConfig = {
    timeout: 30000
}

// FIXME It would be a great idea to validate the response object

export const itemApi = {
    fetchItems: async (): Promise<IItemListResponse> => {
        const response = await Axios.get(URLS.ITEM_LIST_URL, axiosConfig);

        return response.data as IItemListResponse;
    }
}

export const cartApi = {
    addToCart: async (userId: string, item: IItem) => {
        const response = await Axios.post(URLS.ITEM_ADD_URL, {
            userId,
            item
        }, axiosConfig);

        return response.data;
    },
    removeFromCart: async (userId: string, item: IItem) => {
        const response = await Axios.post(URLS.ITEM_DELETE_URL, {
            userId,
            itemName: item.itemName
        }, axiosConfig)

        return response.data;
    },
    getCart: async (userId: string): Promise<ICart> => {
        const response = await Axios.post(URLS.CART_GET_URL, {
            userId
        }, axiosConfig);

        return response.data as ICart;
    }
}