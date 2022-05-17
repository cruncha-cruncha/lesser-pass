import { Account } from "../types"
import { generateAID } from "../crypto/generateAID"
import {
    validateTitle,
    validateAlphabet,
    validateIndex,
    validateLength,
    validateNotes,
    validateUsername
} from '../crypto/validateAccount';
import { sanitizeAccount } from "./sanitizeAccount";

export const formatNewAccount = (account: Omit<Account, 'id'>): Account | null => {
    if (!validateTitle(account.title) ||
        !validateUsername(account.username) ||
        !validateLength(account.length) ||
        !validateIndex(account.index) ||
        !validateAlphabet(account.alphabet) ||
        !validateNotes(account.notes)) {
        return null;
    }

    const aid = generateAID();

    return sanitizeAccount({
        ...account,
        id: aid
    })
}