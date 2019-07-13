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

const moment = require('moment.min.js');
function timestampToString() {
  moment.locale('en', {
    longDateFormat: {
      l: "YYYY-MM-DD",
      L: "YYYY-MM-DD HH:mm:ss"
    }
  });
  return moment().format('h:mm');
}

function deteleObject(obj) {
  var uniques = [];
  var stringify = {};
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i]);
    keys.sort(function (a, b) {
      return (Number(a) - Number(b));
    });
    var str = '';
    for (var j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j]);
      str += JSON.stringify(obj[i][keys[j]]);
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i]);
      stringify[str] = true;
    }
  }
  uniques = uniques;
  return uniques;
}

function deteleObject_key(aa,keyname) {
    var obj = {};
    aa = aa.reduce(function (item, next) {
      obj[next.name] ? '' : obj[next.name] = true && item.push(next);
      return item;
    }, []);
  console.log(aa);
  return aa;
}

module.exports = {
  formatTime: formatTime,
  timestampToString: timestampToString,
  deteleObject: deteleObject,
  deteleObject_key: deteleObject_key
}


