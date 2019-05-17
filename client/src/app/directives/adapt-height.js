import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
var AdaptHeightDirective = /** @class */ (function () {
    function AdaptHeightDirective(el) {
        this.el = el;
    }
    AdaptHeightDirective.prototype.set = function () {
        var view = this.viewport();
        this.el.nativeElement.style.height = (view.height - this.appAdaptHeight) + "px";
        this.adapt();
    };
    AdaptHeightDirective.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.set();
                return [2 /*return*/];
            });
        });
    };
    AdaptHeightDirective.prototype.adapt = function () {
        var _this = this;
        setTimeout(function () {
            _this.set();
        }, 1000);
    };
    AdaptHeightDirective.prototype.viewport = function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    };
    tslib_1.__decorate([
        Input('appAdaptHeight'),
        tslib_1.__metadata("design:type", Number)
    ], AdaptHeightDirective.prototype, "appAdaptHeight", void 0);
    AdaptHeightDirective = tslib_1.__decorate([
        Directive({
            selector: '[appAdaptHeight]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], AdaptHeightDirective);
    return AdaptHeightDirective;
}());
export { AdaptHeightDirective };
//# sourceMappingURL=adapt-height.js.map