import { Account } from "../types";
import {
    validateTitle,
    validateAlphabet,
    validateIndex,
    validateLength,
    validateNotes,
    validateUsername,
    validateId
} from '../crypto/validateAccount';

export const sanitizeAccount = (account:Account): Account|null => {
    if (!('id' in account)) {
        account.id = '';
    }

    if (!('title' in account)) {
        account.title = '';
    }

    if (!('username' in account)) {
        account.username = '';
    }

    if (!('length' in account)) {
        account.length = 0;
    }

    if (!('index' in account)) {
        account.index = 0;
    }

    if (!('alphabet' in account)) {
        account.alphabet = '';
    }

    if (!('notes' in account)) {
        account.notes = '';
    }

    if (!validateId(account.id) ||
        !validateTitle(account.title) ||
        !validateUsername(account.username) ||
        !validateLength(account.length) ||
        !validateIndex(account.index) ||
        !validateAlphabet(account.alphabet) ||
        !validateNotes(account.notes)) {
        return null;
    }

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