import { IItem } from "../_models/item";

export interface ICartItemAdd {
    userId: string;
    item: IItem;
}