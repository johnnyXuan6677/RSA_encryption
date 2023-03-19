const utils = require('./utils');
const keys = require('./keys');

const plainText = 'AB79E5B55DDD9CBD623F3FE003CF34DF60E2FF72972AB4A5C436DE3A74FBCFAE';
const crypted = utils.encrypt(plainText, keys.pubKey); // 加密
const decrypted = utils.decrypt(crypted, keys.privKey); // 解密
console.log ('加密的結果: ',crypted.toString('base64'));//加密後的資料
console.log('解密結果: ',decrypted.toString()); // 你好，我是程序猿小卡