const crypto = require('crypto');

const priPassword = `I will be back !`;
let message = `AB79E5B55DDD9CBD623F3FE003CF34DF60E2FF72972AB4A5C436DE3A74FBCFAE`;
play2RSA(message, priPassword);

async function play2RSA(message, priPassword) {
  const keyPair = await makeKeyPair(priPassword);
  console.log('本次公鑰：',　keyPair.publicKey);
  console.log('本次私鑰：',　keyPair.privateKey);
  let crypted = encrypt(message, keyPair.publicKey);
  console.log('加密結果：',　crypted.toString('base64'));
  let decrypted = decrypt(crypted, keyPair.privateKey, priPassword);
  console.log('解密結果：', decrypted.toString());
};

// 加密方法
function encrypt(data, key) {
  return crypto.publicEncrypt(key, Buffer.from(data));
}

// 解密方法
function decrypt(encrypted, key, priPassword) {
  const keyObj = {
    key: key,
    passphrase: priPassword
  }
  return crypto.privateDecrypt(keyObj, encrypted);
}

// 建立 KeyPair, 並針對私鑰再進行一次加密
function makeKeyPair(priPassword) {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: priPassword
      }
    }, (err, publicKey, privateKey) => {
      const keyPair = {
        publicKey: publicKey,
        privateKey: privateKey
      }
      err !== null ? reject(err) : resolve(keyPair);
    });
  });
}