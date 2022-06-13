import { Account } from "../types";

export const enforceAccountTyping = (data:any): Account => {
    if ('id' in data) {
        data.id = data.id.toString();
    } else {
        data.id = '';
    }

    if ('title' in data) {
        data.title = data.title.toString();
    } else {
        data.title = '';
    }

    if ('username' in data) {
        data.username = data.username.toString();
    } else {
        data.username = '';
    }

    if ('length' in data) {
        data.length = Number(data.length);
    } else {
        data.length = 0;
    }

    if ('index' in data) {
        data.index = Number(data.index);
    } else {
        data.index = 0;
    }

    if ('alphabet' in data) {
        data.alphabet = data.alphabet.toString();
    } else {
        data.alphabet = '';
    }

    if ('notes' in data) {
        data.notes = data.notes.toString();
    } else {
        data.notes = '';
    }

    return data;
}