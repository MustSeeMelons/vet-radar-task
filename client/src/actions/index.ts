import { IAddItemToCart, IRemoveItemFromCart, ISetCart } from "./cartActions";
import { ISetItems } from "./itemActions";
import { ISetUserId } from "./globalActions";

export type Action = IAddItemToCart | IRemoveItemFromCart | ISetItems | ISetUserId | ISetCart;