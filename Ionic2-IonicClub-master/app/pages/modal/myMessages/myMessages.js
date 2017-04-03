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
var MyMessagesPage = (function () {
    function MyMessagesPage(viewCtrl, navParams, ionicService, events) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.ionicService = ionicService;
        this.events = events;
        this.myMessages = {
            has_read_messages: [],
            hasnot_read_messages: []
        };
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    MyMessagesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.myMessages = this.navParams.get('messages');
        this.local.get('User').then(function (u) {
            if (u) {
                var user = JSON.parse(u);
                _this.ionicService.postMessageMark_all(user.accesstoken).subscribe(function (data) {
                    if (data.success) {
                        _this.events.publish('badge', 0);
                        console.log("标记全部已读");
                    }
                });
            }
        });
    };
    MyMessagesPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MyMessagesPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/modal/myMessages/myMessages.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.ViewController, ionic_angular_1.NavParams, IonicService_1.IonicService, ionic_angular_1.Events])
    ], MyMessagesPage);
    return MyMessagesPage;
})();
exports.MyMessagesPage = MyMessagesPage;
