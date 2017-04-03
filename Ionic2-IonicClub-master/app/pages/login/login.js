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
var ionic_native_1 = require('ionic-native');
var account_1 = require("../account/account");
var ionic_native_2 = require('ionic-native');
var LoginPage = (function () {
    function LoginPage(viewCtrl, nav, ionicService) {
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.ionicService = ionicService;
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        ionic_native_2.AppVersion.getVersionNumber().then(function (data) {
            _this.versionNumber = data;
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var confirm = ionic_angular_1.Alert.create({
            title: '扫码登录',
            message: 'PC登录 http://ionichina.com后，扫描设置页面的Access Token二维码即可完成登录',
            buttons: [
                {
                    text: '我知道了',
                    handler: function () {
                        ionic_native_1.BarcodeScanner.scan().then(function (barcodeData) {
                            var User = {
                                accesstoken: '',
                                loginname: '',
                                avatar_url: ''
                            };
                            User.accesstoken = barcodeData.text;
                            _this.ionicService.postUserLogin(User.accesstoken).subscribe(function (data) {
                                User.loginname = data.loginname;
                                User.avatar_url = data.avatar_url;
                                _this.local.set('User', JSON.stringify(User));
                                _this.nav.push(account_1.AccountPage).then(function () {
                                    var index = _this.viewCtrl.index;
                                    _this.nav.remove(index);
                                });
                            });
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        this.nav.present(confirm);
    };
    LoginPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/login/login.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.ViewController, ionic_angular_1.NavController, IonicService_1.IonicService])
    ], LoginPage);
    return LoginPage;
})();
exports.LoginPage = LoginPage;
