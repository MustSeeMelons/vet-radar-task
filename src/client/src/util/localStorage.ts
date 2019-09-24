import uuid from "uuid";

export enum StorageVars {
    USER_ID = "USER_ID"
}

export const UTILS = {
    generateUserId: () => {
        return uuid.v4();
    }
}

export const setUserId = (userId: string) => {
    localStorage.setItem(StorageVars.USER_ID, userId);
}

export const getUserId = () => {
    return localStorage.getItem(StorageVars.USER_ID);
}