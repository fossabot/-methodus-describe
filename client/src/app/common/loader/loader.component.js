import * as tslib_1 from "tslib";
import { Component, Input, NgZone } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
var LoaderComponent = /** @class */ (function () {
    function LoaderComponent(_ngZone, loaderService) {
        this._ngZone = _ngZone;
        this.loaderService = loaderService;
        this.busy = false;
    }
    LoaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.name) {
            this.subscription = this.loaderService.getSubscription(this.name).subscribe(function (value) {
                _this._ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        console.log('busy', value);
                        this.busy = value;
                        return [2 /*return*/];
                    });
                }); });
            });
            this.loaderService.sync();
        }
    };
    LoaderComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LoaderComponent.prototype, "name", void 0);
    LoaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-loader',
            templateUrl: './loader.component.html',
            styleUrls: ['./loader.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NgZone, LoaderService])
    ], LoaderComponent);
    return LoaderComponent;
}());
export { LoaderComponent };
//# sourceMappingURL=loader.component.js.map