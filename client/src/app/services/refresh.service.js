import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
var RefreshService = /** @class */ (function () {
    function RefreshService() {
        this._subscriptions = {};
    }
    RefreshService.prototype.refresh = function (name, value) {
        if (this._subscriptions[name]) {
            this._subscriptions[name].emit(value);
        }
    };
    RefreshService.prototype.subscription = function (name) {
        this._subscriptions[name] = new EventEmitter();
        return this._subscriptions[name];
    };
    RefreshService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], RefreshService);
    return RefreshService;
}());
export { RefreshService };
//# sourceMappingURL=refresh.service.js.map