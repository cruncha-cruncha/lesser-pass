import { useEffect, useState } from "react"
import { DEFAULT_PASSWORD_LENGTH, DEFAULT_INDEX, DEFAULT_ALPHABET } from '../../../../crypto/constants';
import {
    validateTitle,
    validateAlphabet,
    validateIndex,
    validateLength,
    validateNotes,
    validateUsername
} from '../../../../crypto/validateAccount';
import { createAccount } from "../../../../database";
import { LocalAccount } from "../../../../types";

export type Props = {
    close: () => void;
    addLocalAccount: (account:LocalAccount) => void; 
}

export const useAddModal = ({ close, addLocalAccount }: Props) => {
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH.toString());
    const [index, setIndex] = useState(DEFAULT_INDEX.toString());
    const [alphabet, setAlphabet] = useState(DEFAULT_ALPHABET);
    const [notes, setNotes] = useState('');

    const reset = () => {
        setTitle('');
        setUsername('');
        setLength(DEFAULT_PASSWORD_LENGTH.toString());
        setIndex(DEFAULT_INDEX.toString());
        setAlphabet(DEFAULT_ALPHABET);
        setNotes('');
    }

    useEffect(() => {
        reset();
    }, []);

    const makePartialAccount = () => ({
        title,
        username,
        length: Number(length),
        index: Number(index),
        alphabet,
        notes
    });

    const cancel = () => {
        close();
    }

    const confirm = () => {
        close();

        const partialAccount = makePartialAccount();

        createAccount({
            uid: '',
            data: partialAccount
        });

        addLocalAccount({
            ...partialAccount,
            id: '',
            selected: false,
            pending: true,
            canEdit: false
        })
    }

    const validateStringNumber = (num: string, cb: (x: number) => boolean) => {
        if (num.length === 0) {
            return false;
        }

        return cb(Number(num));
    }

    const valid = {
        title: validateTitle(title),
        username: validateUsername(username),
        length: validateStringNumber(length, validateLength),
        index: validateStringNumber(index, validateIndex),
        alphabet: validateAlphabet(alphabet),
        notes: validateNotes(notes),
    }

    const canAdd = valid.title && valid.username && valid.length && valid.index && valid.alphabet && valid.notes;

    return {
        cancel,
        confirm,
        field: {
            title,
            username,
            length,
            index,
            alphabet,
            notes
        },
        setField: {
            title: setTitle,
            username: setUsername,
            length: setLength,
            index: setIndex,
            alphabet: setAlphabet,
            notes: setNotes
        },
        valid,
        canAdd,
    }
}