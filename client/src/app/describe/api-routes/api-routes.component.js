import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DescribeView } from '../../../contracts';
import { Router } from '@angular/router';
var ApiRoutesComponent = /** @class */ (function () {
    function ApiRoutesComponent(router) {
        this.router = router;
    }
    ApiRoutesComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, DescribeView.dashboard()];
                    case 1:
                        _a.dashboard = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiRoutesComponent.prototype.loadTest = function (apiRoute, item) {
        this.router.navigate(['/dashboard/local-services', apiRoute.name, item.propertyKey]);
    };
    ApiRoutesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-api-routes',
            templateUrl: './api-routes.component.html',
            styleUrls: ['./api-routes.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], ApiRoutesComponent);
    return ApiRoutesComponent;
}());
export { ApiRoutesComponent };
//# sourceMappingURL=api-routes.component.js.map