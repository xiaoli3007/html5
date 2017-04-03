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
var AmTimeAgoPipe = (function () {
    function AmTimeAgoPipe() {
    }
    AmTimeAgoPipe.prototype.transform = function (value, args) {
        if (value) {
            value = this.getDateDiff(value);
        }
        return value;
    };
    AmTimeAgoPipe.prototype.getDateDiff = function (pTime) {
        var result;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var now = new Date().getTime();
        var old = new Date(pTime).getTime();
        var diffValue = now - old;
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            result = Math.round(monthC) + "个月前";
        }
        else if (weekC >= 1) {
            result = Math.round(weekC) + "周前";
        }
        else if (dayC >= 1) {
            result = Math.round(dayC) + "天前";
        }
        else if (hourC >= 1) {
            result = Math.round(hourC) + "小时前";
        }
        else if (minC >= 1) {
            result = Math.round(minC) + "分钟前";
        }
        else
            result = "刚刚";
        return result;
    };
    AmTimeAgoPipe = __decorate([
        core_1.Pipe({
            name: 'amTimeAgoPipe'
        }), 
        __metadata('design:paramtypes', [])
    ], AmTimeAgoPipe);
    return AmTimeAgoPipe;
})();
exports.AmTimeAgoPipe = AmTimeAgoPipe;
