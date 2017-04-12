import {Injectable} from  '@angular/core';
import {Http,  Response, Headers} from '@angular/http';
import {Observable} from  'rxjs/Observable';
import {ConfigService} from "./ConfigService";
import * as helper from '../directives/helpers';
import 'rxjs/Rx';


@Injectable()
export class IonicService {
  constructor(private http:Http, private configService:ConfigService) {

  }


  // get请求
  getServerData(data) {
    //let url = this.configService.getHost() +"/applist/?page="+page+"&callback=JSON_CALLBACK";
    let url = this.configService.getHost();
    return this.http.get(url + helper.toQueryString(data)).map(
        res=>res.json()
    ).catch(this.handleError);
  }


  // post请求
  postServerData(data) {
    let url = this.configService.getHost();
    let body = helper.toBodyString(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,body,{headers: headers}).map(
        res=>res.json()
    ).catch(this.handleError);
  }


  private handleError(error:Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error');
  }


}
