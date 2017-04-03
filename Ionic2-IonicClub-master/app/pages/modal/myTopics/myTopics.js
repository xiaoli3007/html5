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
var AmTimeAgoPipe_1 = require('../../../pipe/AmTimeAgoPipe');
var avatarPipe_1 = require("../../../pipe/avatarPipe");
var MyTopicsPage = (function () {
    function MyTopicsPage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.myTopics = {
            recent_topics: [],
            recent_replies: [],
        };
    }
    MyTopicsPage.prototype.ngOnInit = function () {
        this.myTopics = this.navParams.get('topics');
    };
    MyTopicsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MyTopicsPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/modal/myTopics/myTopics.html',
            pipes: [AmTimeAgoPipe_1.AmTimeAgoPipe, avatarPipe_1.AvatarPipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.ViewController, ionic_angular_1.NavParams])
    ], MyTopicsPage);
    return MyTopicsPage;
})();
exports.MyTopicsPage = MyTopicsPage;
