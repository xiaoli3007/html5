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
var IonicService_1 = require("../../services/IonicService");
var ConfigService_1 = require("../../services/ConfigService");
var TabNamePipe_1 = require("../../pipe/TabNamePipe");
var avatarPipe_1 = require("../../pipe/avatarPipe");
var AmTimeAgoPipe_1 = require('../../pipe/AmTimeAgoPipe');
var topicAdd_1 = require("../modal/topicAdd/topicAdd");
var login_1 = require("../login/login");
var account_1 = require("../account/account");
var TopicsPage = (function () {
    function TopicsPage(ionicService, nav, navParams, events) {
        var _this = this;
        this.ionicService = ionicService;
        this.nav = nav;
        this.navParams = navParams;
        this.events = events;
        this.topics = [];
        this.rootPage = login_1.LoginPage;
        this.badge = 0;
        //主题列表默认参数
        this.params = {
            page: 1,
            tab: 'all',
            limit: 20
        };
        if (navParams.get('tab')) {
            this.params.tab = navParams.get('tab');
        }
        this.events.subscribe('badge', function (data) {
            _this.badge = data;
        });
        this.events.subscribe('doRefresh', function () {
            _this.params.page = 1;
            _this.params.tab = 'all';
            _this.ionicService.getTopics(_this.params).subscribe(function (data) {
                _this.topics = data;
                _this.params.page++;
            });
        });
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    TopicsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.ionicService.getTopics(_this.params)
                .subscribe(function (data) {
                _this.topics = _this.topics.concat(data);
                _this.params.page++;
            });
            infiniteScroll.complete();
        }, 500); // 延迟500ms
    };
    TopicsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.params.page = 1;
        this.params.tab = 'all';
        setTimeout(function () {
            _this.ionicService.getTopics(_this.params).subscribe(function (data) {
                _this.topics = [];
                _this.topics = data;
                _this.params.page++;
            });
            refresher.complete();
        }, 500); // 延迟500ms
    };
    TopicsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.ionicService.getTopics(this.params).subscribe(function (data) {
            _this.topics = data;
            _this.params.page++;
        });
        this.local.get('User').then(function (u) {
            if (u) {
                _this.rootPage = account_1.AccountPage;
                var user = JSON.parse(u);
                _this.ionicService.getMessageCount(user.accesstoken).subscribe(function (data) {
                    _this.badge = data;
                });
            }
        });
    };
    TopicsPage.prototype.addTopic = function () {
        var modal = ionic_angular_1.Modal.create(topicAdd_1.TopicAddPage);
        this.nav.present(modal);
    };
    TopicsPage.prototype.goTo = function () {
        var _this = this;
        this.local.get('User').then(function (u) {
            if (u) {
                _this.nav.push(account_1.AccountPage);
            }
            else {
                _this.nav.push(login_1.LoginPage);
            }
        });
    };
    TopicsPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/topics/topics.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService],
            pipes: [AmTimeAgoPipe_1.AmTimeAgoPipe, TabNamePipe_1.TabNamePipe, avatarPipe_1.AvatarPipe]
        }), 
        __metadata('design:paramtypes', [IonicService_1.IonicService, ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.Events])
    ], TopicsPage);
    return TopicsPage;
})();
exports.TopicsPage = TopicsPage;
