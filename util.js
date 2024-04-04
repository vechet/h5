const privateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDrm2t5bev9uyWs
7Q2aDDWs6QcKH8Dk3GveGd/z5mS6zxmOZ1mxCUfF+5Ll6B0qCAoNpfj9sIrwoACF
tAR8TIV3GkyWPUzVzeNWSEhq+Y1Bxri0iVMTfTKJDUTQCs/5mGJ6maB/GE2/wtQ6
dhC2lknv2CTzvqv31Ff+CzCA42ABVVGdM+Kui9IqBsuuCehVfia+tyTNjdL4rwbI
nK/+4zNNpBp21CL1lChF07FMULe35CgnbFEhv+h+NMRIA0TNjqLkC+XzsDC2Bu/Y
wfbxXSxQFDiKV8XFsRjLmm7VuoBlCSl7gX5+l33VQiy6gze1oGlJOBIrslhLLwWi
JJMxBh9zAgMBAAECggEAOqu5V8PHwKeZ+jYN7Q6dTzG4Tw0ZO+Sn9+b5ngMBkoOA
GbYi37Mv7F15d0cV/CGEX2G1X3dXIhS2DJWHiGyFz+L8r20UdSmQMyxM3FbIllim
Jk8MIQ5MR1TGjggjQkRwQZeAICYtNlOOBgDgqJdEUjXA/fG9YTm/r8OZkH8OqUXb
e70vIZe5sfeMW3skN7er3nHHRNWw+/C6FdU/Wab/6ouRLO9QSreve+URhdyP/3+a
/WX5m72DPcK7VFmjbePHbgsk3nmHr1/yqolLDpt2AyPaYOq5iN+IWWBImFTmsesh
Axh6SwORe1zywi2lCj3/gOFdRqUYnOQD4TDGbsgCAQKBgQD2tgKEf55i5rC85GYc
KCShg4+Dr9tJC95X/4RVKuXHISFU/ErbIJENbHJEBWcA0l1vfx0HZFdX/uMwo+F4
nYlfPNz++iZUSW/RUoXHWci1pILfFFdA6tfjpenQJZJ2OANYllMDwhiH7zrMBszu
l9eb6cOBTAhT32wtT/K82DK4FQKBgQD0emHjONvwneurGdX/lVHvTMKlR2hohOHn
5/nnpTU9t+A0BxPdgpC/r+W76dRKCGszLtHwXSvX2ZPxpc+a4JkCHlvINEsE8X18
uoCdpgjYkxFjbOL9hR82QyuRwMKosEHBHH/WilVaTrZXLa6kmbiWLL5iENGvDnMF
and9gcKTZwKBgQCuURgiSpG8y8chEDhduLd5L53drAnC6RHnF3GHQ9IrCuukQscZ
YT9cPr3V9gM7f2fpeeUm7e0RDdW07nZHZPhFRJnZxyIB+Al721UO8A9y2JRnztV/
1u9HuFkmawW7ZgRnOX/abfArTAs9UajHBJ6hWWB8IR7ZNEoZEh4u9IuRqQKBgQDC
Foqx9oj9rJHVQ2yWPLhQj5MT3e3w1FX4Yz0N/yWWeu0ewOOvfqFl3MI4/fkQUUCx
4KDA/2b4NP7z4BxCK76tZOaeuY05PnLOW84R2ie5sIAke+R1OoM98/OaAftIKq35
HqQK8cWzLTwrV9QHTxaw+pKmjg25uXHtQcndNPABTwKBgQDw4ahjCZUw78buGOMA
5jpopcxFssNdTI9mtwuMGOsiv6Yp5Wq9yAdL75QR9XDqwu8tB+Y/pdUvKQpqD/Gp
ZPYKCWgfu3xH353VNys72sytOd3FEfMUIyE3YQpEuvA6raLBu52TsTf78JqkDS/h
yThT5Ee6mPn01hDlXuVM7faV5w==
-----END PRIVATE KEY-----
`;

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
