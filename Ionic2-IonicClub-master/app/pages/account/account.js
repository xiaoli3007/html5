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
var myCollects_1 = require("../modal/myCollects/myCollects");
var avatarPipe_1 = require("../../pipe/avatarPipe");
var myTopics_1 = require("../modal/myTopics/myTopics");
var myMessages_1 = require("../modal/myMessages/myMessages");
var ionic_native_1 = require('ionic-native');
var topics_1 = require("../topics/topics");
var DateFormatPipe_1 = require("../../pipe/DateFormatPipe");
var AccountPage = (function () {
    function AccountPage(viewCtrl, nav, events, ionicService) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.events = events;
        this.ionicService = ionicService;
        this.hasnot_read_messages_count = 0;
        this.user = {
            avatar_url: '',
            loginname: '',
            score: '',
            create_at: '',
            recent_topics: [],
            recent_replies: [],
            collect_topics: []
        };
        this.myTopics = {
            recent_topics: [],
            recent_replies: []
        };
        this.myMessages = {
            has_read_messages: [],
            hasnot_read_messages: []
        };
        this.events.subscribe('badge', function (data) {
            _this.hasnot_read_messages_count = data;
        });
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    AccountPage.prototype.openMyCollects = function () {
        var modal = ionic_angular_1.Modal.create(myCollects_1.MyCollectsPage);
        this.nav.present(modal);
    };
    AccountPage.prototype.openMyMessages = function () {
        var modal = ionic_angular_1.Modal.create(myMessages_1.MyMessagesPage, { 'messages': this.myMessages });
        this.nav.present(modal);
    };
    AccountPage.prototype.openMyTopics = function () {
        var modal = ionic_angular_1.Modal.create(myTopics_1.MyTopicsPage, { 'topics': this.myTopics });
        this.nav.present(modal);
    };
    AccountPage.prototype.ngOnInit = function () {
        var _this = this;
        this.local.get('User').then(function (u) {
            if (u) {
                var user = JSON.parse(u);
                _this.ionicService.getUserByName(user.loginname).subscribe(function (data) {
                    _this.user = data;
                    _this.myTopics.recent_replies = data.recent_replies;
                    _this.myTopics.recent_topics = data.recent_topics;
                });
                _this.ionicService.getMessages(user.accesstoken).subscribe(function (data) {
                    _this.myMessages = data;
                });
                _this.ionicService.getMessageCount(user.accesstoken).subscribe(function (data) {
                    _this.hasnot_read_messages_count = data;
                });
            }
        });
        ionic_native_1.AppVersion.getVersionNumber().then(function (data) {
            _this.versionNumber = data;
        });
    };
    AccountPage.prototype.loginOut = function () {
        this.local.clear();
        this.nav.setRoot(topics_1.TopicsPage);
    };
    AccountPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/account/account.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService],
            pipes: [avatarPipe_1.AvatarPipe, DateFormatPipe_1.DateFormatPipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.ViewController, ionic_angular_1.NavController, ionic_angular_1.Events, IonicService_1.IonicService])
    ], AccountPage);
    return AccountPage;
})();
exports.AccountPage = AccountPage;
