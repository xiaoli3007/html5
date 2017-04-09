import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';




@Injectable()
//var user_info = {
//  userid: 0,
//  username: '',
//  email: '',
//  groupid: '',
//  groupids: '',
//  photo: '',
//  truename: '',
//}
export class Common {


  constructor( public storage:Storage) {
    this.storage = storage;
  }


//: Promise<string>
  getUserinfo() {

    return  this.storage.get("storage_user_info").then((value) => {
       return value;
      //return JSON.parse(value);
    });
  }


  getSpinnerConfig() {
    return {
      spinner: "circles",
      content: `<ion-spinner [name]="d.spinner"></ion-spinner><p><strong>`+"请求中。。。</strong></p>",
      duration: 20000
    };
  }

  openLink(link) {
    window.open(link, "_system", "location=yes");
  }

  versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
      zeroExtend = options && options.zeroExtend,
      v1parts = v1.split('.'),
      v2parts = v2.split('.');

    function isValidPart(x) {
      return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
      return NaN;
    }

    if (zeroExtend) {
      while (v1parts.length < v2parts.length) v1parts.push("0");
      while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
      v1parts = v1parts.map(Number);
      v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
      if (v2parts.length == i) {
        return 1;
      }

      if (v1parts[i] == v2parts[i]) {
        continue;
      }
      else if (v1parts[i] > v2parts[i]) {
        return 1;
      }
      else {
        return -1;
      }
    }

    if (v1parts.length != v2parts.length) {
      return -1;
    }

    return 0;
  }
}
