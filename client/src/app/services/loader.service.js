import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
var LoaderService = /** @class */ (function () {
    function LoaderService() {
        this.waiting = [];
        this.subs = {};
    }
    LoaderService.prototype.setBusy = function (name) {
        if (name === void 0) { name = 'main'; }
        if (!this.subs[name]) {
            this.waiting.push({ name: name, state: true });
        }
        else {
            var emitter = this.validateEmitter(name);
            emitter.emit(true);
        }
        console.log('setBusy', name);
    };
    LoaderService.prototype.clearBusy = function (name) {
        if (name === void 0) { name = 'main'; }
        var emitter = this.validateEmitter(name);
        emitter.emit(false);
    };
    LoaderService.prototype.sync = function () {
        var _this = this;
        this.waiting.forEach(function (waitingItem) {
            _this.subs[waitingItem.name].emit(waitingItem.state);
        });
        this.waiting = [];
    };
    LoaderService.prototype.getSubscription = function (name) {
        return this.validateEmitter(name);
    };
    LoaderService.prototype.validateEmitter = function (name) {
        if (!this.subs[name]) {
            this.subs[name] = new EventEmitter();
        }
        return this.subs[name];
    };
    LoaderService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], LoaderService);
    return LoaderService;
}());
export { LoaderService };
//# sourceMappingURL=loader.service.js.map