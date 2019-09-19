import {
    Request, Response, Router, NextFunction
} from "express";
import { listItems } from "../db/dbService";
import { asyncErrHandler } from "../utils";
const express = require("express");

const itemRouter: Router = express.Router();

/* Returns all items */
itemRouter
    .route("/list")
    .get((req: Request, res: Response, next: NextFunction) => {
        asyncErrHandler(async () => {
            res.send(await listItems());
        })(req, res, next);
    });

export default itemRouter;