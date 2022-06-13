import { MIN_MASTER_PASSWORD_LENGTH } from "./constants";

export const validateMasterPassword = (password:string) => {
    return password.length >= MIN_MASTER_PASSWORD_LENGTH;
}