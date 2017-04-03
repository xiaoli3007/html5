var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('es6-shim');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var CommonService_1 = require("./services/CommonService");
var router_1 = require("angular2/router");
var topics_1 = require("./pages/topics/topics");
var user_1 = require("./pages/user/user");
var topicDetail_1 = require("./pages/topicDetail/topicDetail");
var login_1 = require("./pages/login/login");
var account_1 = require("./pages/account/account");
var ionic_native_2 = require('ionic-native');
var MyApp = (function () {
    function MyApp(app, platform, commonService) {
        var _this = this;
        this.app = app;
        this.commonService = commonService;
        this.rootPage = topics_1.TopicsPage;
        this.tabs = [];
        this.backPressed = false;
        platform.ready().then(function () {
            ionic_native_1.StatusBar.styleDefault();
            _this.registerBackButtonListener();
        });
    }
    MyApp.prototype.registerBackButtonListener = function () {
        var _this = this;
        document.addEventListener('backbutton', function () {
            var nav = _this.getNav();
            if (nav.canGoBack()) {
                nav.pop();
                return;
            }
            if (!_this.backPressed) {
                _this.backPressed = true;
                ionic_native_2.Toast.showShortBottom("再按一次退出应用").subscribe(function (toast) {
                    console.log(toast);
                });
                setTimeout(function () { return _this.backPressed = false; }, 2000);
                return;
            }
            // 利用 cordova.js 退出应用(不影响使用)
            // navigator.app.exitApp();
        }, false);
    };
    MyApp.prototype.getNav = function () {
        return this.app.getComponent('nav');
    };
    MyApp.prototype.setRootPage = function (tab) {
        this.getNav().setRoot(topics_1.TopicsPage, { tab: tab });
    };
    MyApp = __decorate([
        ionic_angular_1.App({
            templateUrl: 'build/app.html',
            providers: [CommonService_1.CommonService],
            config: {
                backButtonText: '',
                backButtonIcon: 'arrow-round-back',
            }
        }),
        router_1.RouteConfig([
            { path: '/topics', component: topics_1.TopicsPage, as: 'Topic' },
            { path: '/topics/:tab', component: topics_1.TopicsPage, as: 'Topic' },
            { path: '/topicDetail/:id', component: topicDetail_1.TopicDetailPage, as: 'TopicDetail' },
            { path: '/user/:loginname', component: user_1.UserPage, as: 'User' },
            { path: '/login', component: login_1.LoginPage, as: 'Login' },
            { path: '/account', component: account_1.AccountPage, as: 'Account' }
        ]), 
        __metadata('design:paramtypes', [ionic_angular_1.IonicApp, ionic_angular_1.Platform, CommonService_1.CommonService])
    ], MyApp);
    return MyApp;
})();
exports.MyApp = MyApp;
