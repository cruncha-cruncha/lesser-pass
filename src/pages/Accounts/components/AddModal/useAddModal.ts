import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { DEFAULT_PASSWORD_LENGTH, DEFAULT_ALPHABET } from '../../../../crypto/constants';
import { generateAID } from "../../../../crypto/generateAID";
import { generateIndex } from "../../../../crypto/generateIndex";
import {
    validateTitle,
    validateAlphabet,
    validateIndex,
    validateLength,
    validateNotes,
    validateUsername
} from '../../../../crypto/validateAccount';
import { createAccount } from "../../../../database";
import { uidState } from "../../../../state";

export type Props = {
    close: () => void;
}

export const useAddModal = ({ close }: Props) => {
    const uid = useRecoilValue(uidState);
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH.toString());
    const [index, setIndex] = useState(generateIndex().toString());
    const [alphabet, setAlphabet] = useState(DEFAULT_ALPHABET);
    const [notes, setNotes] = useState('');

    const reset = () => {
        setTitle('');
        setUsername('');
        setLength(DEFAULT_PASSWORD_LENGTH.toString());
        setIndex(generateIndex().toString());
        setAlphabet(DEFAULT_ALPHABET);
        setNotes('');
    }

    useEffect(() => {
        reset();
    }, []);

    const makeAccount = () => ({
        id: generateAID(),
        title,
        username,
        length: Number(length),
        index: Number(index),
        alphabet,
        notes
    });

    const cancel = () => {
        close();
        reset();
    }

    const confirm = () => {
        close();

        const newAccount = makeAccount();

        createAccount({
            uid,
            data: newAccount
        });

        reset();
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