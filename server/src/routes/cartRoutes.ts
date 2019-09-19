import {
    Request, Response, Router, NextFunction
} from "express";
import { addItemToCart, removeItemFromCart, getCart } from "../db/dbService";
import { asyncErrHandler } from "../utils";
const express = require("express");

const cartRouter: Router = express.Router();

/* Add item to current users cart */
cartRouter
    .route("/add")
    .post((req: Request, res: Response, next: NextFunction) => {
        asyncErrHandler(async () => {
            res.send(await addItemToCart(req.body));
        })(req, res, next);
    });

/* Remove item from current users cart */
cartRouter
    .route("/delete")
    .post((req: Request, res: Response, next: NextFunction) => {
        asyncErrHandler(async () => {
            res.send(await removeItemFromCart(req.body));
        })(req, res, next);
    });

/* Retrive the cart of the current user */
cartRouter
    .route("/get")
    .post((req: Request, res: Response, next: NextFunction) => {
        asyncErrHandler(async () => {
            res.send(await getCart(req.body));
        })(req, res, next);
    });

export default cartRouter;