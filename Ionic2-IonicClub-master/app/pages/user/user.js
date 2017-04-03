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
var AmTimeAgoPipe_1 = require('../../pipe/AmTimeAgoPipe');
var avatarPipe_1 = require("../../pipe/avatarPipe");
var DateFormatPipe_1 = require("../../pipe/DateFormatPipe");
var UserPage = (function () {
    function UserPage(navParams, nav, ionicService) {
        this.navParams = navParams;
        this.nav = nav;
        this.ionicService = ionicService;
        this.user = {
            avatar_url: '',
            loginname: '',
            score: '',
            create_at: '',
            recent_topics: [],
            recent_replies: [],
            collect_topics: []
        };
    }
    UserPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loginname = this.navParams.get('loginname');
        this.ionicService.getUserByName(this.loginname).subscribe(function (data) {
            _this.user = data;
        });
    };
    UserPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/user/user.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService],
            pipes: [AmTimeAgoPipe_1.AmTimeAgoPipe, DateFormatPipe_1.DateFormatPipe, avatarPipe_1.AvatarPipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, ionic_angular_1.NavController, IonicService_1.IonicService])
    ], UserPage);
    return UserPage;
})();
exports.UserPage = UserPage;
