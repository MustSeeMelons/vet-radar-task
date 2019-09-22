import { ISetCart } from "./cartActions";
import { ISetItems } from "./itemActions";
import { ISetUserId, ISetControls, ISetErr } from "./globalActions";

export type Action = ISetItems | ISetUserId | ISetCart | ISetControls | ISetErr;