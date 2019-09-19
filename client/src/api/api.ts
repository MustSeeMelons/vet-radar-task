import Axios, { AxiosRequestConfig } from "axios";
import { URLS } from "./apiConfig";

const axiosConfig: AxiosRequestConfig = {
    timeout: 30000
}

// TODO finish this wrapper which would handle setting err flags
const errorHandler = async () => {

}

export const itemApi = {
    fetchItems: async (): Promise<any> => {

        const response = await Axios.get(URLS.ITEM_LIST_URL, axiosConfig);

        return response.data as any;
    }
}

export const cartApi = {

}