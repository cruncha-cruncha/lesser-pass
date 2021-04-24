import { atom } from 'recoil';

export const LOGIN_ENUM = {
  'unknown': 0,
  'out': 1,
  'temptIn': 2,
  'in': 3,
  'temptOut': 4
};

export const loginState = atom({
  key: 'login',
  default: LOGIN_ENUM['unknown']
});

export const uidState = atom({
  key: 'uid',
  default: ''
});