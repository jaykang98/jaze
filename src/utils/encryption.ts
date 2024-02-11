import CryptoJS from 'crypto-js';

const secretKey = 'a0c2b1ab664e5ea5ca735d57f4cdaaf8';

export const encrypt = (text: string): string => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (ciphertext: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
