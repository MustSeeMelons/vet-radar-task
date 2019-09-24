export enum GlobalActionTypes {
    SET_USER_ID = "SET_USER_ID",
    SET_CONTROLS = "TOGGLE_CONTROLS",
    SET_ERR = "SET_ERR"
}

export interface ISetUserId {
    type: GlobalActionTypes.SET_USER_ID, payload: {
        userId: string
    }
}

export const setUserIdActionCreator = (userId: string): ISetUserId => {
    return {
        type: GlobalActionTypes.SET_USER_ID,
        payload: {
            userId
        }
    }
}

export interface ISetControls {
    type: GlobalActionTypes.SET_CONTROLS,
    payload: {
        value: boolean
    }
}

export const setControlsActionCreator = (value: boolean = false): ISetControls => {
    return {
        type: GlobalActionTypes.SET_CONTROLS,
        payload: {
            value
        }
    }
}

export interface ISetErr {
    type: GlobalActionTypes.SET_ERR,
    payload: {
        err: boolean
    }
}

export const setErrActionCreator = (err: boolean = false): ISetErr => {
    return {
        type: GlobalActionTypes.SET_ERR,
        payload: {
            err
        }
    }
}
