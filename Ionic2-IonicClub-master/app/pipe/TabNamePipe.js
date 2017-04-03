var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var CommonService_1 = require("../services/CommonService");
var TabNamePipe = (function () {
    function TabNamePipe(commonService) {
        this.commonService = commonService;
        this.tabList = this.commonService.getTabs();
    }
    TabNamePipe.prototype.transform = function (value, args) {
        for (var i in this.tabList) {
            if (this.tabList[i].value === value) {
                return this.tabList[i].label;
            }
        }
    };
    TabNamePipe = __decorate([
        core_1.Pipe({
            name: 'tabNamePipe'
        }), 
        __metadata('design:paramtypes', [CommonService_1.CommonService])
    ], TabNamePipe);
    return TabNamePipe;
})();
exports.TabNamePipe = TabNamePipe;
