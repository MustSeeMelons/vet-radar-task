const env = process.env as any;

export const MONGO_URL: string = `mongodb://${env.DOCKER === "1" ? "mongo" : "localhost"}:27017`;

export const DB_URL: string = "VET_RADAR_TEST";
export const ITEM_COLLECTION: string = "items";
export const CART_COLLECTION: string = "carts";