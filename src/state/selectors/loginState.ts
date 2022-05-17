import { selector } from 'recoil';
import { loginStateState } from '../atoms';
import { Login as LoginEnum } from '../Login.enum';

export const loginIsUnknownState = selector({
    key: 'loginIsUnkownState',
    get: ({ get }) => {
        const login = get(loginStateState);
        return login === LoginEnum.Unknown;
    },
});

export const loginIsOutState = selector({
    key: 'loginIsOutState',
    get: ({ get }) => {
        const login = get(loginStateState);
        return login === LoginEnum.Out;
    },
});

export const loginIsTemptInState = selector({
    key: 'loginIsTemptInState',
    get: ({ get }) => {
        const login = get(loginStateState);
        return login === LoginEnum.TemptIn;
    },
});

export const loginIsInState = selector({
    key: 'loginIsInState',
    get: ({ get }) => {
        const login = get(loginStateState);
        return login === LoginEnum.In;
    },
});

export const loginIsTemptOutState = selector({
    key: 'loginIsTemptOutState',
    get: ({ get }) => {
        const login = get(loginStateState);
        return login === LoginEnum.TemptOut;
    },
});