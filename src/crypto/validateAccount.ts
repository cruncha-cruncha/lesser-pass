import { Account } from '../types';
import {
  MAX_PASSWORD_LENGTH,
  MIN_UNIQUE_ALPHABET_CHARS,
  MAX_ALPHABET_LENGTH,
  ALLOWED_CHARS
} from './constants';

type Props = {
  account: Account;
}

export const validateId = (id: string) => {
  if (id.length <= 0) {
    return false;
  }
  
  return true;
}

const areAllCharsAllowed = (s: string) => {
  return s.split("").reduce((out, char) => {
    return out && ALLOWED_CHARS.includes(char);
  }, true);
}

export const validateTitle = (title: string) => {
  const allCharsAllowed = areAllCharsAllowed(title);

  if (title.length <= 0) {
    return false;
  }

  if (!allCharsAllowed) {
    return false;
  }

  return true;
}

export const validateUsername = (username: string) => {
  const allCharsAllowed = areAllCharsAllowed(username);

  if (!allCharsAllowed) {
    return false;
  }

  return true;
}

export const validateLength = (length: number) => {
  if (length > MAX_PASSWORD_LENGTH) {
    return false;
  }

  if (length <= 0) {
    return false;
  }

  if (Math.floor(length) !== length) {
    return false;
  }
  
  return true;
}

export const validateIndex = (index: number) => {
  return true;
}

export const validateAlphabet = (alphabet: string) => {
  const allCharsAllowed = areAllCharsAllowed(alphabet);

  if (!allCharsAllowed) {
    return false;
  }

  const charCounts = alphabet.split("").reduce((collector, char) => {
    collector[char] = (char in collector) ? collector[char] += 1 : collector[char] = 1;
    return collector;
  }, {} as { [s: string]: number })

  const uniqueCharCount = Object.keys(charCounts).length;

  const allCharsUnique = Object.values(charCounts).reduce((out, count) => {
    return out && count === 1;
  }, true);

  if (uniqueCharCount < MIN_UNIQUE_ALPHABET_CHARS) {
    return false;
  }
  
  if (!allCharsUnique) {
    return false;
  }
  
  if (alphabet.length > MAX_ALPHABET_LENGTH) {
    return false;
  }

  return true;
}

export const validateNotes = (notes: string) => {
  const allCharsAllowed = areAllCharsAllowed(notes);

  if (!allCharsAllowed) {
    return false;
  }

  return true;
}