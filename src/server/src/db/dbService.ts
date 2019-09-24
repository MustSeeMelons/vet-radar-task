import { ICartItemAdd } from "../../../_requests/cartItemAdd";
import { ICartItemRemove } from "../../../_requests/cartItemRemove";
import { ICartGet } from "../../../_requests/cartGet";
import { IItemListResponse } from "../../../_responses/itemListResponse";
import { ICart, ICartItemQuantity } from "../../../_models/cart";
import { MongoClient, Db } from "mongodb";
import _ from "lodash";
import { MONGO_URL, DB_URL, CART_COLLECTION, ITEM_COLLECTION } from "../mongoConfig";
import { IItem } from "../../../_models/item";
import { SUCCESS, NO_CART_ERR, NO_SUCH_ITEM_ERR, BaseMsg } from "../../../_responses";
import { formatPrice } from "../../../_utils/utils";

/**
 * FIXME: Should validate incoming requests
 * FIXME: Add method do delete all items at once, would make for a better UX
 */

// Helper for obtaining a db instance
const obtainDb = async (): Promise<Db> => {
    const client: MongoClient = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = client.db(DB_URL);

    return db;
}

// Probably should split into multiple services in the future
const addItemToCart = async (cartOperation: ICartItemAdd): Promise<BaseMsg> => {
    const db = await obtainDb();

    const collection = db.collection(CART_COLLECTION);

    // Check if the user has a cart
    const existingCart = await collection.findOne<ICart>({
        userId: cartOperation.userId
    });

    // Checking if user already has the item in his cart
    if (existingCart) {
        const existingQuantity: ICartItemQuantity = existingCart.itemQuantities.find((itemQuantity: ICartItemQuantity) => {
            // Should be compared using some sort of id
            return _.get(itemQuantity, "item.itemName") === _.get(cartOperation, "item.itemName");
        }) as ICartItemQuantity;

        if (existingQuantity) {
            await collection.updateOne({
                userId: cartOperation.userId, "itemQuantities.item.itemName": cartOperation.item.itemName
            }, {
                $set: {
                    "itemQuantities.$.quantity": existingQuantity.quantity + 1
                }
            });
        } else {
            await collection.updateOne({
                userId: cartOperation.userId
            },
                {
                    $push: {
                        itemQuantities: {
                            quantity: 1,
                            item: {
                                itemName: cartOperation.item.itemName,
                                price: cartOperation.item.price
                            }
                        }
                    }
                });
        }
    } else {
        collection.insertOne({
            userId: cartOperation.userId,
            itemQuantities: [{
                quantity: 1,
                item: cartOperation.item
            }]
        })
    }

    return SUCCESS;
}

const removeItemFromCart = async (cartOperation: ICartItemRemove): Promise<BaseMsg> => {
    const db = await obtainDb();

    const collection = db.collection(CART_COLLECTION);

    // Check if the user has a cart
    const existingCart = await collection.findOne<ICart>({
        userId: cartOperation.userId
    });

    if (existingCart) {
        const existingQuantity: ICartItemQuantity = existingCart.itemQuantities.find((itemQuantity: ICartItemQuantity) => {
            // Should be compared using some sort of id
            return _.get(itemQuantity, "item.itemName") === _.get(cartOperation, "itemName");
        }) as ICartItemQuantity;

        if (!existingQuantity) {
            return NO_SUCH_ITEM_ERR;
        }

        if (existingQuantity.quantity === 1) {
            // Deleting whole item entry
            await collection.updateOne({
                userId: cartOperation.userId
            }, {
                $pull: {
                    itemQuantities: {
                        "item.itemName": cartOperation.itemName
                    }
                }
            })
        } else {
            // Just updating the quantity
            await collection.updateOne({
                userId: cartOperation.userId, "itemQuantities.item.itemName": cartOperation.itemName
            }, {
                $set: {
                    "itemQuantities.$.quantity": existingQuantity.quantity - 1
                }
            });
        }

        return SUCCESS;
    } else {
        return NO_CART_ERR;
    }
}

const listItems = async (): Promise<BaseMsg | IItemListResponse> => {
    const db = await obtainDb();

    const collection = db.collection(ITEM_COLLECTION);

    const documents = collection.find<IItem>({});

    let results: IItem[] = [];

    // Keeping things a sync way
    const wrap = new Promise<void>((resolve) => {
        documents.toArray((err, items) => {
            if (err) {
                throw err;
            }
            results = items
            resolve();
        })
    });

    await wrap;

    return {
        items: results
    };
}

const getCart = async (cartOperation: ICartGet): Promise<ICart> => {
    const db = await obtainDb();

    const collection = db.collection(CART_COLLECTION);

    const existingCart = await collection.findOne<ICart>({
        userId: cartOperation.userId
    }) as ICart;

    if (existingCart) {
        existingCart.totalPrice = formatPrice(
            existingCart.itemQuantities.reduce((acc: number, curr: ICartItemQuantity) => {
                return acc + (parseFloat(curr.item.price) * curr.quantity);
            }, 0)
        );
    }

    return existingCart;
}

export {
    addItemToCart,
    listItems,
    removeItemFromCart,
    getCart
}