import crypto from 'crypto';

export const generateBase64String = (length = 64) =>{
  const buffer = crypto.randomBytes(length); // 64 bytes = 512 bits
  return buffer.toString('base64');
}

// Example usage
// const uniqueString = generateBase64String();
// console.log('Base64 Unique String:', uniqueString);
