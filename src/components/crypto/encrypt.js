import { BaseN } from './BaseN';

// adapted from https://github.com/lesspass/lesspass

export const calcPassword = async ({ profile, masterPassword }) => {
  const { account, username, index, length } = profile;
  if (!index || !length || length < 1 || length > 40) {
    return '';
  }

  const salt = account + username + index.toString(16);
  const password = await pbkdf2er({ plainText: masterPassword, salt, iterations: 250000, digest: "SHA-256"});
  return password.substring(0, length);
}

const getAlphabet = () =>
  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~';

function pbkdf2er({ plainText, salt, iterations, digest }) {
  if (!plainText || !salt) {
    return '';
  }

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
        iterations,
        hash: digest,
      };
      return window.crypto.subtle.deriveKey(
        algo, // algorithm
        key, // baseKey
        {
          name: "AES-CTR",
          length: 256,
        }, // derivedKeyAlgorithm
        true, // extractable
        ["encrypt", "decrypt"] // keyUsages
      );
    }).then((derivedKey) =>
      window.crypto.subtle.exportKey("raw", derivedKey).then((keyArray) => {
        const byteArr = bufferToByteArray(keyArray);

        const converted = new BaseN({
          alphabet: getAlphabet(),
          blockMaxBitsCount: 32
        }).encodeBytes(byteArr);

        return converted;
      })
    );
};

function stringToArrayBuffer(string) {
  const base64String = unescape(encodeURIComponent(string));
  const charList = base64String.split("");
  const arrayBuffer = [];
  for (let i = 0; i < charList.length; i += 1) {
    arrayBuffer.push(charList[i].charCodeAt(0));
  }
  return new Uint8Array(arrayBuffer);
}

const bufferToByteArray = (keyArray) => Array.from(new Uint8Array(keyArray));
