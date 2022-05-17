import { atom } from 'recoil';
import { Account, UID } from '../types';
import { Login } from './Login.enum';

export const loginStateState = atom<Login>({
    key: 'loginStateState',
    default: Login.Unknown
});

export const uidState = atom<UID>({
    key: 'uidState',
    default: ''
});

export const accountsState = atom<Account[]>({
    key: 'accountState',
    default: []
});