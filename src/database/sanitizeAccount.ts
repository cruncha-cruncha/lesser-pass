import { Account } from "../types";

export const sanitizeAccount = (account:Account): Account => {
    return {
        id: account.id,
        title: account.title,
        username: account.username,
        length: account.length,
        index: account.index,
        notes: account.notes,
        alphabet: account.alphabet
    }
}