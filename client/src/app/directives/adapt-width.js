import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
var AdaptWidthDirective = /** @class */ (function () {
    function AdaptWidthDirective(el) {
        this.el = el;
    }
    AdaptWidthDirective.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view;
            return tslib_1.__generator(this, function (_a) {
                view = this.viewport();
                this.el.nativeElement.style.width = (view.width - this.appAdaptWidth) + "px";
                return [2 /*return*/];
            });
        });
    };
    AdaptWidthDirective.prototype.viewport = function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    };
    tslib_1.__decorate([
        Input('appAdaptWidth'),
        tslib_1.__metadata("design:type", Number)
    ], AdaptWidthDirective.prototype, "appAdaptWidth", void 0);
    AdaptWidthDirective = tslib_1.__decorate([
        Directive({
            selector: '[appAdaptWidth]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], AdaptWidthDirective);
    return AdaptWidthDirective;
}());
export { AdaptWidthDirective };
//# sourceMappingURL=adapt-width.js.map