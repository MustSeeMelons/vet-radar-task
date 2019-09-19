import { IAddItemToCart, IRemoveItemFromCart } from "./cartActions";
import { ISetItems } from "./itemActions";

export type Action = IAddItemToCart | IRemoveItemFromCart | ISetItems;