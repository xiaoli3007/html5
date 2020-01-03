
var fun_aes = require('./aes.js')
const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
}

function util_substring(val) {
  return val.substring(0, 60) + "..."
}

function findKey(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}

// 根据搜索字分割字符
function global_hilight_word(key, word) {
  let idx = word.indexOf(key), t = [];

  if (idx > -1) {
    if (idx == 0) {
      t = global_hilight_word(key, word.substr(key.length));
      t.unshift({ key: true, str: key });
      return t;
    }

    if (idx > 0) {
      t = global_hilight_word(key, word.substr(idx));
      t.unshift({ key: false, str: word.substring(0, idx) });
      return t;
    }
  }
  return [{ key: false, str: word }];
}

 function Encrypt(word) {
  var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
  var key = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.jiamikey);
  var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
    mode: fun_aes.CryptoJS.mode.ECB,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  });
  //返回大写十六进制加密结果
  return encrypted.toString();
}

function Decrypt(word) {
  var key = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.jiamikey);
  //mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7
  var decrypt = fun_aes.CryptoJS.AES.decrypt(word, key, {
    mode: fun_aes.CryptoJS.mode.ECB,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
  return JSON.parse(decryptedStr.toString());
}

module.exports = {
  formatTime: formatTime,
  GetPercent: GetPercent,
  util_substring: util_substring,
  findKey: findKey,
  global_hilight_word: global_hilight_word,
  Encrypt: Encrypt,
  Decrypt: Decrypt,
}
