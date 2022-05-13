// adapted from https://github.com/lesspass/lesspass

export const calcPassword = async ({ profile, masterPassword }) => {
  const { account, username, index, length } = profile;
  if (!index || !length || length < 1 || length > 32) {
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
          length: 256, // aka number of output bits, 256 is the max supported
        }, // derivedKeyAlgorithm
        true, // extractable
        ["encrypt", "decrypt"] // keyUsages
      );
    }).then((derivedKey) =>
      window.crypto.subtle.exportKey("raw", derivedKey).then((keyArray) => {
        const byteArr = bufferToByteArray(keyArray);

        const alphabet = getAlphabet();

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
      })
    );
};

const stringToArrayBuffer = (string) => (new TextEncoder()).encode(string);

const bufferToByteArray = (keyArray) => Array.from(new Uint8Array(keyArray));
