db.createCollection("items");
db.createCollection("carts");

db.items.insertMany([{
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
        price: 13.9
    },
    {
        itemName: "Hacksaw",
        price: 19.45
    }
]);