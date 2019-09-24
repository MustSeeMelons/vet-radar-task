const env = process.env as any;

const HOST_BASE_URL = `http://${env.DOCKER === "1" ? "server" : "localhost"}:8080`;
const CART_BASE_URL = `${HOST_BASE_URL}/carts`;
const ITEMS_BASE_URL = `${HOST_BASE_URL}/items`;

export const URLS = {
    ITEM_LIST_URL: `${ITEMS_BASE_URL}/list`,
    ITEM_ADD_URL: `${CART_BASE_URL}/add`,
    ITEM_DELETE_URL: `${CART_BASE_URL}/delete`,
    CART_GET_URL: `${CART_BASE_URL}/get`
}