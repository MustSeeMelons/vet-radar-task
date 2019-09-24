import * as Mongo from "mongodb";
import Chalk from "chalk";

import {
    MONGO_URL,
    DB_URL,
    ITEM_COLLECTION,
    CART_COLLECTION
} from "../src/mongoConfig";

const log = (msg: string, err: boolean = false) => {
    const func = err ? Chalk.redBright : Chalk.magentaBright;
    console.log(func(msg));
}

(async () => {
    let client: Mongo.MongoClient | undefined = undefined;

    try {
        client = await Mongo.MongoClient.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        log("Connected.\n");

        const db: Mongo.Db = client.db(DB_URL);

        log("Dropping collections.");
        db.dropCollection(ITEM_COLLECTION);
        db.dropCollection(CART_COLLECTION);

        log("Creating collections.");
        const itemCollection = await db.createCollection(ITEM_COLLECTION);
        await db.createCollection(CART_COLLECTION);

        log("Inserting defaults.");
        itemCollection.insertMany([{
            itemName: "Sledgehammer",
            price: 125.76
        },
        {
            itemName: "Axe",
            price: 190.51
        },
        {
            itemName: "Bandsaw",
            price: 562.14
        },
        {
            itemName: "Chisel",
            price: 13.90
        },
        {
            itemName: "Hacksaw",
            price: 19.45
        }
        ]);

        log("Done.");
    } catch (e) {
        log("\nSomething went wrong.\n", true);
        log(e, true);
        process.exit(0);
    } finally {
        if (client && client.isConnected) {
            log("\nClosing the connection.\n");
            client.close();
        } else {
            log("\nNothing to close.\n");
        }
    }
})();