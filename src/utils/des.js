import cryptoJs from 'crypto-js';

//随机生成指定数量的16进制key
export const generatekey = (num) => {
  let library = "xx";
  let key = "";
  for (var i = 0; i < num; i++) {
      let randomPoz = Math.floor(Math.random() * library.length);
      key += library.substring(randomPoz, randomPoz + 1);
  }
  return key;
}

//DES加密
export const encryptDes = (message, key) => {
  var keyHex = cryptoJs.enc.Utf8.parse(key)
  var option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 }
  var encrypted = cryptoJs.DES.encrypt(message, keyHex, option)
  return encrypted.ciphertext.toString()
}


//DES解密
export const decryptDes = (message, key) => {
  var keyHex = cryptoJs.enc.Utf8.parse(key)
  var decrypted = cryptoJs.DES.decrypt(
      {
          ciphertext: cryptoJs.enc.Hex.parse(message)
      },
      keyHex,
      {
          mode: cryptoJs.mode.ECB,
          padding: cryptoJs.pad.Pkcs7
      }
  )
  return decrypted.toString(cryptoJs.enc.Utf8)
}