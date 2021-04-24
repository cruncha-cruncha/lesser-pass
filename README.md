# Lesser Pass
A password manager that doesn't store any passwords, only their salts. [Site](https://cruncha-cruncha.github.io/lesser-pass/)

## How to use
Lesser Pass can't store passwords for you, but instead generates secure passwords. Every password requires: an account, a username, a desired password length, and an index. If your password is leaked, changing the index is an easy way to force Lesser Pass to generate a completely new password, however changing the account or username will do the same thing. The notes field does not affect generated passwords in any way and is simply a convenience.  

After logging in with a google account, enter a master password, and add some new password info. Clicking on a row will generate a password and copy it to your clipboard. Your master password is never saved, so don't forget it.

## Encryption
Lesser Pass leverages Web Crypto to generate passwords using 250000 rounds of PBKDF2 SHA-256. The relevent code is in [this](https://github.com/cruncha-cruncha/lesser-pass/blob/main/src/components/crypto/encrypt.js) file. Generated passwords can contain all 95 ASCII printable characters.

## Inspiration
Full credit for this idea goes to [LessPass](https://lesspass.com/#/), and the Web Crypto code was adapted from their repo. The algorithm for converting from binary to base n was adapted from [this project](https://github.com/KvanTTT/BaseNcoding).
