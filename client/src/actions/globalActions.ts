export enum GlobalActionTypes {
    SET_USER_ID = "SET_USER_ID",
    TOGGLE_CONTROLS = "TOGGLE_CONTROLS"
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

export interface IToggleControls {
    type: GlobalActionTypes.TOGGLE_CONTROLS
}

export const toggleControlsActionCreator = (): IToggleControls => {
    return {
        type: GlobalActionTypes.TOGGLE_CONTROLS
    }
}
