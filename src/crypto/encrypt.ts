// adapted from https://github.com/lesspass/lesspass

import { Account } from "../types";
import { validateAlphabet, validateIndex, validateLength, validateTitle, validateUsername } from "./validateAccount";
import { validateMasterPassword } from "./validateMasterPassword";

export type Props = {
  profile: Pick<Account, 'title' | 'username' | 'index' | 'length' | 'alphabet'>;
  masterPassword: string;
}

export const calcPassword = async ({ profile, masterPassword }: Props) => {
  const { title, username, index, length, alphabet } = profile;
  if (!validateTitle(title) ||
    !validateUsername(username) ||
    !validateLength(length) ||
    !validateIndex(index) ||
    !validateAlphabet(alphabet)) {
    return '';
  }

  if (!validateMasterPassword(masterPassword)) {
    return '';
  }

  const salt = title + username + index.toString(16);
  const password = await pbkdf2er({ plainText: masterPassword, salt, alphabet });
  return password.substring(0, length);
}

type pbkdfProps = {
  plainText: string;
  salt: string;
  alphabet: string;
}

function pbkdf2er({ plainText, salt, alphabet }: pbkdfProps) {
  return window.crypto.subtle
    .importKey(
      "raw", // format
      stringToArrayBuffer(plainText), // keyData
      "PBKDF2", // algorithm
      false, // extractable
      ["deriveKey"] // keyUsages
    ).then((key) => {
      const algo = {
        name: "PBKDF2",
        salt: stringToArrayBuffer(salt),
        iterations: 250000,
        hash: "SHA-256",
      };
      return window.crypto.subtle.deriveKey(
        algo, // algorithm
        key, // baseKey
        {
          name: "AES-CTR",
          length: 256, // aka number of output bits, 256 is the max supported
        }, // derivedKeyAlgorithm
        true, // extractable
        ["encrypt", "decrypt"] // keyUsages
      );
    }).then((derivedKey) => {
      return window.crypto.subtle.exportKey("raw", derivedKey);
    }).then((keyArray) => {
      return keyToString(keyArray, alphabet);
    });
};

const keyToString = (keyArray: ArrayBuffer, alphabet: string) => {
  const byteArr = bufferToByteArray(keyArray);

  // I think (byte + offset) provides more equal probability of a
  // character being selected **over the length of the output** than
  // just using (byte) % alphabet.
  let converted = '';
  let offset = 0;
  const remainder = 256 % alphabet.length;
  byteArr.forEach((byte) => {
    converted = converted + alphabet.charAt((byte + offset) % alphabet.length);
    offset = (offset + remainder) % alphabet.length;
  })

  return converted;
}

const stringToArrayBuffer = (s: string) => (new TextEncoder()).encode(s);

const bufferToByteArray = (keyArray: ArrayBuffer) => Array.from(new Uint8Array(keyArray));
