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
var AmTimeAgoPipe_1 = require('../../../pipe/AmTimeAgoPipe');
var avatarPipe_1 = require("../../../pipe/avatarPipe");
var MyCollectsPage = (function () {
    function MyCollectsPage(viewCtrl, ionicService) {
        this.viewCtrl = viewCtrl;
        this.ionicService = ionicService;
        this.myCollects = {
            collect_topics: []
        };
        this.collectData = {
            accesstoken: '',
            topic_id: ''
        };
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    MyCollectsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.local.get('User').then(function (u) {
            if (u) {
                _this.user = JSON.parse(u);
                _this.ionicService.getUserByName(_this.user.loginname).subscribe(function (data) {
                    _this.collectData.accesstoken = _this.user.accesstoken;
                    _this.myCollects.collect_topics = data.collect_topics;
                });
            }
        });
    };
    MyCollectsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MyCollectsPage.prototype.remove = function (topic_id) {
        var _this = this;
        this.collectData.topic_id = topic_id;
        this.ionicService.postTopicDeCollect(this.collectData).subscribe(function (data) {
            if (data.success) {
                _this.ionicService.getUserByName(_this.user.loginname).subscribe(function (data) {
                    _this.myCollects.collect_topics = [];
                    _this.myCollects.collect_topics = data.collect_topics;
                });
            }
        });
    };
    MyCollectsPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/modal/myCollects/myCollects.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService],
            pipes: [AmTimeAgoPipe_1.AmTimeAgoPipe, avatarPipe_1.AvatarPipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.ViewController, IonicService_1.IonicService])
    ], MyCollectsPage);
    return MyCollectsPage;
})();
exports.MyCollectsPage = MyCollectsPage;
