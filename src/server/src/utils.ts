import {
    NextFunction,
    Request,
    Response
} from "express";

/**
 * Helper for handling thrown errors in async functions
 * @param fn 
 */
export const asyncErrHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        next(err);
    });
};