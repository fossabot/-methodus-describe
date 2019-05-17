import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DescribeView } from '../../../contracts';
import { TestRouteService } from '../test-route.service';
var TestFormComponent = /** @class */ (function () {
    function TestFormComponent(route, router, testRouteService) {
        this.route = route;
        this.router = router;
        this.testRouteService = testRouteService;
        this.editorOptions = { theme: 'vs-light', language: 'json', automaticLayout: true };
        this.tabs = [{ name: 'method', selected: true }, { name: 'result', selected: false }];
    }
    TestFormComponent.prototype.selectTab = function (tab) {
        this.tabs.forEach(function (element) {
            element.selected = false;
        });
        tab.selected = true;
    };
    TestFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var actionInfo;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.controllerName = data.controller;
                        this.methodName = data.method;
                        return [4 /*yield*/, DescribeView.action(this.controllerName, this.methodName)];
                    case 1:
                        actionInfo = _a.sent();
                        this.methodInfo = actionInfo.methodus._descriptors[this.methodName];
                        this.baseUrl = actionInfo.base;
                        return [2 /*return*/];
                }
            });
        }); });
    };
    TestFormComponent.prototype.testMethod = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.testRouteService.activate(this.baseUrl + this.methodInfo.route, this.methodInfo)];
                    case 1:
                        _a.actionResult = _b.sent();
                        this.actionResultJson = JSON.stringify(this.actionResult, null, 2);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        this.actionResultJson = JSON.stringify(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-test-form',
            templateUrl: './test-form.component.html',
            styleUrls: ['./test-form.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router,
            TestRouteService])
    ], TestFormComponent);
    return TestFormComponent;
}());
export { TestFormComponent };
//# sourceMappingURL=test-form.component.js.map