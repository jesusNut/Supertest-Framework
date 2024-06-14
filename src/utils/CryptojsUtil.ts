// Include CryptoJS library/package (make sure to include it in your project)
// You can download it from: https://cryptojs.gitbook.io/docs/
import CryptoJSUtil from "crypto-js";

// Function to remove BOM if present
function removeBom(text: string) {
  if (text.charCodeAt(0) === 0xfeff) {
    return text.slice(1);
  }
  return text;
}

// Encryption function
export function encrypt(text: string) {
  // Get the SALT from the system environment variable
  const utf8Text = Buffer.from(text, "utf-8").toString();
  const SALT = process.env.SALT || "GodIsGod";
  const cipherText = CryptoJSUtil.AES.encrypt(utf8Text, SALT).toString();
  return cipherText;
}

// Decryption function
export function decrypt(cipherText: string) {
  // Get the SALT from the system environment variable
  try {
    const SALT = process.env.SALT || "GodIsGod";
    const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
    let originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
    originalText = removeBom(originalText);

    if (!originalText) {
      throw new Error("****** Decryption resulted in an empty string. ******");
    }
    return originalText;
  } catch (error: any) {
    console.error("Decryption error:", error);
    throw new Error("****** Failed to decrypt data ******* " + error.message);
  }
}
