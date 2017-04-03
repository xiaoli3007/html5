var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var CommonService = (function () {
    function CommonService() {
        this._tabs = [{
                value: 'share',
                label: '分享',
                icon: 'share'
            }, {
                value: 'ask',
                label: '问答',
                icon: 'help-circle'
            }, {
                value: 'job',
                label: '招聘',
                icon: 'bowtie'
            }, {
                value: 'bb',
                label: '吐槽',
                icon: 'text'
            }];
    }
    CommonService.prototype.getTabs = function () {
        return this._tabs;
    };
    CommonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CommonService);
    return CommonService;
})();
exports.CommonService = CommonService;
