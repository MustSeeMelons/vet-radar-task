export enum GlobalActionTypes {
    ADD_RANDOM_PIC = "ADD_RANDOM_PIC"
}

export interface IAddRandomPic {
    type: GlobalActionTypes.ADD_RANDOM_PIC, payload: {
        pic: any
    }
}

export const addRandomPicActionCreator = (image: any): IAddRandomPic => {
    return {
        type: GlobalActionTypes.ADD_RANDOM_PIC,
        payload: {
            pic: image
        }
    }
}
