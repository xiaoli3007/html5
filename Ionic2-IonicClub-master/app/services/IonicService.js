var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
var ConfigService_1 = require("./ConfigService");
var helper = require('../directives/helpers');
require('rxjs/Rx');
var IonicService = (function () {
    function IonicService(http, configService) {
        this.http = http;
        this.configService = configService;
    }
    // 获取主题
    IonicService.prototype.getTopics = function (data) {
        var url = this.configService.getHost() + "/api/v1/topics";
        return this.http.get(url + helper.toQueryString(data)).map(function (res) { return res.json().data; }).catch(this.handleError);
    };
    // 通过ID获取主题详情
    IonicService.prototype.getTopicById = function (id) {
        var url = this.configService.getHost() + "/api/v1/topic/" + id;
        return this.http.get(url).map(function (res) { return res.json().data; }).catch(this.handleError);
    };
    // 新增主题
    IonicService.prototype.postTopic = function (data) {
        var url = this.configService.getHost() + "/api/v1/topics";
        var body = helper.toBodyString(data);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    // 收藏主题
    IonicService.prototype.postTopicCollect = function (data) {
        var url = this.configService.getHost() + "/api/v1/topic/collect";
        var body = helper.toBodyString(data);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json().data; }).catch(this.handleError);
    };
    // 取消收藏主题
    IonicService.prototype.postTopicDeCollect = function (data) {
        var url = this.configService.getHost() + "/api/v1/topic/de_collect";
        var body = helper.toBodyString(data);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    // 新建评论
    IonicService.prototype.postReplie = function (id, data) {
        var url = this.configService.getHost() + "/api/v1/topic/" + id + "/replies";
        var body = helper.toBodyString(data);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    // 为评论点赞
    IonicService.prototype.postReplieUps = function (reply_id, accesstoken) {
        var url = this.configService.getHost() + "/api/v1/reply/" + reply_id + "/ups";
        var body = 'accesstoken=' + accesstoken;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    // 获取用户详情
    IonicService.prototype.getUserByName = function (loginname) {
        var url = this.configService.getHost() + "/api/v1/user/" + loginname;
        return this.http.get(url).map(function (res) { return res.json().data; }).catch(this.handleError);
    };
    // 验证 accessToken 的正确性
    IonicService.prototype.postUserLogin = function (accesstoken) {
        var url = this.configService.getHost() + "/api/v1/accesstoken";
        var body = 'accesstoken=' + accesstoken;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    // 获取未读消息数
    IonicService.prototype.getMessageCount = function (accessToken) {
        var url = this.configService.getHost() + "/api/v1/message/count?accesstoken=" + accessToken;
        return this.http.get(url).map(function (res) { return res.json().data; }).catch(this.handleError);
    };
    // 获取消息
    IonicService.prototype.getMessages = function (accessToken) {
        var url = this.configService.getHost() + "/api/v1/messages?accesstoken=" + accessToken;
        return this.http.get(url).map(function (res) { return res.json().data; }).catch(this.handleError);
    };
    // 标记全部已读
    IonicService.prototype.postMessageMark_all = function (accesstoken) {
        var url = this.configService.getHost() + "/api/v1/message/mark_all";
        var body = 'accesstoken=' + accesstoken;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    IonicService.prototype.handleError = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error.json().error || 'Server Error');
    };
    IonicService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ConfigService_1.ConfigService])
    ], IonicService);
    return IonicService;
})();
exports.IonicService = IonicService;
