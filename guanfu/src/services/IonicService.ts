import {Injectable, Inject} from  '@angular/core';
import {Http,  Response, Headers} from '@angular/http';
import {Observable} from  'rxjs/Observable';
import {ConfigService} from "./ConfigService";
import * as helper from '../directives/helpers';
import 'rxjs/Rx';


@Injectable()
export class IonicService {
  constructor(private http:Http, private configService:ConfigService) {

  }

  // 登录验证
  user_login(data) {
    //let url = this.configService.getHost() +"?act=userverify&user="+username+"&pwd="+passwd+"";
    let url = this.configService.getHost() +helper.toQueryString(data);
    return this.http.get(url).map(
        res=>res.json()
    ).catch(this.handleError);
  }


  // 获取主题
  getTopics(data) {
    //let url = this.configService.getHost() +"/applist/?page="+page+"&callback=JSON_CALLBACK";
    let url = this.configService.getHost() +"/applist/";
    return this.http.get(url + helper.toQueryString(data)).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 通过ID获取主题详情
  getTopicById(id) {
    let url = this.configService.getHost() +"/app_photo_show/?id="+id+"&callback=JSON_CALLBACK";
    return this.http.get(url).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 新增主题
  postTopic(data) {
    let url = this.configService.getHost() + "/api/v1/topics";
    let body = helper.toBodyString(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url,body,{headers: headers}).map(
        res=>res.json()
    ).catch(this.handleError);
  }

  // 为评论点赞
  postReplieUps(reply_id, accesstoken) {
    let url = this.configService.getHost() + "/api/v1/reply/" + reply_id + "/ups";
    let body = 'accesstoken=' + accesstoken;
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
