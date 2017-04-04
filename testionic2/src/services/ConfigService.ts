import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  hostURL:string = "http://192.168.1.100:8001";

  constructor() {

  }

  getHost() {
    return this.hostURL;
  }
}
