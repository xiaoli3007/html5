import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  hostURL:string = "http://guanfumaster.com/appapi/app_ionic.php";

  constructor() {

  }

  getHost() {
    return this.hostURL;
  }
}
