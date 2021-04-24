import _ from 'lodash';

// adapted from https://github.com/KvanTTT/BaseNcoding/blob/master/res/BaseN.js

export function BaseN ({ alphabet, blockMaxBitsCount }) {
  const encodeBytes = (data) => {
    if (!data || data.length === 0) {
      return "";
    }
  
    let {
      bitsCount: blockBitsCount,
      charsCountInBits: blockCharsCount
    } = getOptimalBitsCount({
      charsCount: alphabet.length,
      maxBitsCount: blockMaxBitsCount,
      radix: 2
    });
  
    const mainBitsLength = Math.floor(data.length * 8 / blockBitsCount) * blockBitsCount;
    const tailBitsLength = data.length * 8 - mainBitsLength;
    const mainCharsCount = Math.floor(mainBitsLength * blockCharsCount / blockBitsCount);
    const tailCharsCount = Math.floor((tailBitsLength * blockCharsCount + blockBitsCount - 1) / blockBitsCount);
    const iterCount = Math.floor(mainCharsCount / blockCharsCount);
  
    const result = [];
  
    for (let i = 0; i < iterCount; i++) {
      const bitPos = i * blockBitsCount;
      const bits = getBitsN({ data, bitPos, bitsCount: blockBitsCount});
      bitsToChars({
        chars: result,
        ind: i * blockCharsCount,
        count: blockCharsCount,
        block: bits,
        bigCharsCount: BigInt(alphabet.length), 
        alphabet
      });
    }
  
    if (tailBitsLength != 0) {
      const bits = getBitsN({ data, bitPos: mainBitsLength, bitsCount: tailBitsLength });
      bitsToChars({
        chars: result,
        ind: mainCharsCount,
        count: tailCharsCount,
        block: bits,
        bigCharsCount: BigInt(alphabet.length),
        alphabet
      });
    }
  
    return result.join("");
  }

  return Object.freeze({
    encodeBytes
  });
}

const bitsToChars = ({ chars, ind, count, block, bigCharsCount, alphabet }) => {
  let localBlock = _.cloneDeep(block);
  for (let i = 0; i < count; i++) {
    const remainder = localBlock % bigCharsCount;
    chars[ind + i] = alphabet[remainder];
    localBlock = localBlock / bigCharsCount;
  }
}

const getBitsN = ({ data, bitPos, bitsCount }) => {
  let result = BigInt(0);

  let curBytePos = Math.floor(bitPos / 8);
  let curBitInBytePos = bitPos % 8;
  const shift = 8 - curBitInBytePos;
  let xLength = Math.min(bitsCount, shift);

  if (xLength != 0) {
    result = BigInt((data[curBytePos] >> shift - xLength) & ((1 << shift) - 1)) << BigInt(bitsCount - xLength);

    curBytePos += Math.floor((curBitInBytePos + xLength) / 8);
    curBitInBytePos = (curBitInBytePos + xLength) % 8;

    let x2Length = bitsCount - xLength;
    if (x2Length > 8) {
      x2Length = 8;
    }

    while (x2Length > 0) {
      xLength += x2Length;
      result |= BigInt(data[curBytePos] >> 8 - x2Length) << BigInt(bitsCount - xLength);

      curBytePos += Math.floor((curBitInBytePos + x2Length) / 8);
      curBitInBytePos = (curBitInBytePos + x2Length) % 8;

      x2Length = bitsCount - xLength;
      if (x2Length > 8) {
        x2Length = 8;
      }
    }
  }

  return result;
}

const getOptimalBitsCount = ({ charsCount, maxBitsCount, radix }) => {
  let bitsCount = 0;
  let charsCountInBits = 0;
  const n1 = logBaseN(charsCount, radix);
  const charsCountLog = Math.log(radix) / Math.log(charsCount);
  let maxRatio = 0;

  for (let n = n1; n <= maxBitsCount; n++) {
    let l1 = Math.ceil(n * charsCountLog);
    let ratio = n / l1;
    if (ratio > maxRatio) {
      maxRatio = ratio;
      bitsCount = n;
      charsCountInBits = l1;
    }
  }

  return { bitsCount, charsCountInBits };
}

// ???
const logBaseN = (x, n) => {
  let r = 0;
  while ((x = Math.floor(x / n)) !== 0) {
    r++;
  }  
  return r;
}