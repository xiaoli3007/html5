var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var IonicService_1 = require("../../../services/IonicService");
var ConfigService_1 = require("../../../services/ConfigService");
var TopicAddPage = (function () {
    function TopicAddPage(viewCtrl, nav, ionicService, events) {
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.ionicService = ionicService;
        this.events = events;
        this.topicData = {
            accesstoken: '',
            title: '',
            tab: '',
            content: ''
        };
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    TopicAddPage.prototype.ngOnInit = function () {
        var _this = this;
        this.local.get('User').then(function (u) {
            if (u) {
                var user = JSON.parse(u);
                _this.topicData.accesstoken = user.accesstoken;
            }
            else {
                _this.loading('请登录后使用', 500);
                _this.dismiss();
            }
        });
    };
    TopicAddPage.prototype.submit = function () {
        var _this = this;
        if (this.validate()) {
            this.ionicService.postTopic(this.topicData).subscribe(function (data) {
                if (data.success) {
                    _this.events.publish('doRefresh');
                    _this.loading('提交成功', 500);
                    _this.dismiss();
                }
                else {
                    _this.loading('提交失败', 500);
                }
            });
        }
    };
    TopicAddPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    TopicAddPage.prototype.validate = function () {
        if (this.topicData.tab == '') {
            this.loading('类别不能为空', 500);
            return false;
        }
        else if (this.topicData.title == '') {
            this.loading('标题不能为空', 500);
            return false;
        }
        else if (this.topicData.title.length <= 10) {
            this.loading('标题字数在10字以上', 500);
            return false;
        }
        else if (this.topicData.content == '') {
            this.loading('内容不能为空', 500);
            return false;
        }
        else {
            return true;
        }
    };
    TopicAddPage.prototype.loading = function (content, duration) {
        var loading = ionic_angular_1.Loading.create({
            spinner: 'hide',
            content: content,
            duration: duration
        });
        this.nav.present(loading);
    };
    TopicAddPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/modal/topicAdd/topicAdd.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService],
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.ViewController, ionic_angular_1.NavController, IonicService_1.IonicService, ionic_angular_1.Events])
    ], TopicAddPage);
    return TopicAddPage;
})();
exports.TopicAddPage = TopicAddPage;
