import { v4 as uuidv4 } from 'uuid';
import { AID } from '../types';

export const generateAID = (): AID => {
    return uuidv4()
}