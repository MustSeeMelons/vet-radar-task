import {
    Application, Request, Response, NextFunction
} from "express";
import cors from "cors";
import cartRouter from "./routes/cartRoutes";

// TODO: Is there really no better solution?
const express = require("express");
import * as bodyParser from "body-parser";
import itemRouter from "./routes/itemRoutes";

const app: Application = express();

app.use(bodyParser.json());

// Allowing everything for now
app.use(cors({
    origin: "*"
}));

app.use("/items", itemRouter);
app.use("/carts", cartRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).send({
        msg: err.message
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})