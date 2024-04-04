const generateTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

const generateNonceStr = () => {
  const SYMBOLS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const nonceChars = new Array(32);
  for (let index = 0; index < nonceChars.length; ++index) {
    nonceChars[index] = SYMBOLS.charAt(
      Math.floor(Math.random() * SYMBOLS.length)
    );
  }
  return nonceChars.join("");
};

const generatePaySign = (message) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const sha256 = forge.md.sha256.create();
  sha256.update(forge.util.encodeUtf8(message));
  const signature = forge.util.encode64(privateKey.sign(sha256));
  return signature;
};
