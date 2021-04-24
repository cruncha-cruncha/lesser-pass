import { atom } from 'recoil';

export const masterPasswordState = atom({
  key: 'masterPassword',
  default: ''
});