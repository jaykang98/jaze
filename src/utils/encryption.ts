import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

// It's important to replace 'YOUR_SECRET_KEY' with an actual secure key.
const secretKey: Buffer = Buffer.from('YOUR_SECRET_KEY', 'hex'); // Ensure your key is of proper length for AES-256
const algorithm: string = 'aes-256-ctr';

interface EncryptedData {
  iv: string;
  content: string;
}

export const encrypt = (text: string): EncryptedData => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (hash: EncryptedData): string => {
  const iv = Buffer.from(hash.iv, 'hex');
  const decipher = createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
};
