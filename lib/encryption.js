// ./lib/encryption.js
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'YOUR_SECRET_KEY'; // Replace with your secret key

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
};

const decrypt = (hash) => {
    const iv = Buffer.from(hash.iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrypted.toString();
};

module.exports = { encrypt, decrypt };