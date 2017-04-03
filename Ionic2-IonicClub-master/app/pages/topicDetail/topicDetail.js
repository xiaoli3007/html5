var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require("ionic-angular");
var IonicService_1 = require("../../services/IonicService");
var ConfigService_1 = require("../../services/ConfigService");
var AmTimeAgoPipe_1 = require('../../pipe/AmTimeAgoPipe');
var avatarPipe_1 = require("../../pipe/avatarPipe");
var linkPipe_1 = require("../../pipe/linkPipe");
var ionic_native_1 = require('ionic-native');
var TopicDetailPage = (function () {
    function TopicDetailPage(nav, navParams, ionicService) {
        this.nav = nav;
        this.navParams = navParams;
        this.ionicService = ionicService;
        this.isLogin = false;
        this.topicDetail = {
            author: {
                loginname: '',
                avatar_url: ''
            },
            create_at: '',
            last_reply_at: '',
            content: '',
            visit_count: '',
            reply_count: '',
            replies: []
        };
        // 评论参数
        this.replyData = {
            accesstoken: '',
            content: '',
            reply_id: ''
        };
        // 收藏参数
        this.collectData = {
            accesstoken: '',
            topic_id: ''
        };
        // 分享参数
        this.shareData = {
            message: '',
            subject: '',
            link: ''
        };
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    TopicDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.navParams.get('id');
        this.collectData.topic_id = this.id;
        this.ionicService.getTopicById(this.id).subscribe(function (data) {
            _this.topicDetail = data;
            _this.shareData.message = data.content.substring(0, 150) + '......';
            _this.shareData.subject = data.title;
            _this.shareData.link = 'http://ionichina.com/topic/' + data.id;
        });
        this.local.get('User').then(function (u) {
            if (u) {
                _this.isLogin = true;
                _this.user = JSON.parse(u);
                _this.replyData.accesstoken = _this.user.accesstoken;
                _this.collectData.accesstoken = _this.user.accesstoken;
            }
        });
    };
    // 点赞
    TopicDetailPage.prototype.replieUps = function (replyId) {
        var _this = this;
        if (this.isLogin) {
            this.ionicService.postReplieUps(replyId, this.replyData.accesstoken).subscribe(function (data) {
                if (data.success) {
                    if (data.action == 'up') {
                        _this.loading('赞一个', 500);
                    }
                    else {
                        _this.loading('取消点赞', 500);
                    }
                }
                else {
                    _this.loading(data.error_msg, 500);
                }
            }, function (error) {
                _this.loading(error, 500);
            });
        }
        else {
            this.loading('请登录后使用', '500');
        }
    };
    // 回复
    TopicDetailPage.prototype.reReply = function (replyId, loginname) {
        if (this.isLogin) {
            this.replyData.content = '@' + loginname + ' ';
            this.replyData.reply_id = replyId;
        }
        else {
            this.loading('请登录后使用', '500');
        }
    };
    // 收藏
    TopicDetailPage.prototype.collect = function () {
        var _this = this;
        if (this.isLogin) {
            this.ionicService.postTopicCollect(this.collectData).subscribe(function (data) {
                _this.loading('收藏成功', 500);
            });
        }
        else {
            this.loading('请登录后使用', '500');
        }
    };
    // 分享
    TopicDetailPage.prototype.share = function () {
        ionic_native_1.SocialSharing.share(this.shareData.message, this.shareData.subject, this.shareData.link);
    };
    // 提交评论
    TopicDetailPage.prototype.saveReply = function () {
        var _this = this;
        if (this.replyData.content.indexOf('@') < 0) {
            this.replyData.reply_id = '';
        }
        this.ionicService.postReplie(this.id, this.replyData).subscribe(function (data) {
            if (data.success) {
                var replie = {
                    author: {
                        loginname: _this.user.loginname,
                        avatar_url: _this.user.avatar_url
                    },
                    content: '<div class=\"markdown-text\"><p>' + _this.replyData.content + '</p>\n</div>',
                    id: data.reply_id
                };
                _this.topicDetail.replies.unshift(replie);
                _this.loading('评论成功', 500);
                _this.replyData.content = '';
            }
        });
    };
    TopicDetailPage.prototype.loading = function (content, duration) {
        var loading = ionic_angular_1.Loading.create({
            spinner: 'hide',
            content: content,
            duration: duration
        });
        this.nav.present(loading);
    };
    TopicDetailPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/topicDetail/topicDetail.html',
            providers: [IonicService_1.IonicService, ConfigService_1.ConfigService],
            pipes: [AmTimeAgoPipe_1.AmTimeAgoPipe, linkPipe_1.LinkPipe, avatarPipe_1.AvatarPipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, IonicService_1.IonicService])
    ], TopicDetailPage);
    return TopicDetailPage;
})();
exports.TopicDetailPage = TopicDetailPage;
