import { getApp } from '../firebase/getApp';

export const connect = async (): Promise<boolean> => {
  const appInst = getApp();
  // TODO: check connection
  return true; 
}