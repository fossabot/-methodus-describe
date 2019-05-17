import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
var DirtyService = /** @class */ (function () {
    function DirtyService() {
        this.detect = new EventEmitter();
        this.dirty = new EventEmitter();
        this.saving = new EventEmitter();
    }
    DirtyService.prototype.setDirty = function () {
        this._dirty = true;
        this.dirty.emit(true);
    };
    DirtyService.prototype.warn = function () {
        if (this._dirty) {
            return confirm('Are you sure? some data may be lost.');
        }
        return true;
    };
    DirtyService.prototype.clearDirty = function () {
        this._dirty = false;
        this.dirty.emit(false);
    };
    DirtyService.prototype.setSaving = function () {
        this._saving = false;
        this.saving.emit(true);
    };
    DirtyService.prototype.clearSaving = function () {
        this._saving = false;
        this.saving.emit(false);
    };
    DirtyService.prototype.detectChanges = function () {
        if (!this._dirty) {
            this.detect.emit();
        }
    };
    DirtyService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], DirtyService);
    return DirtyService;
}());
export { DirtyService };
//# sourceMappingURL=dirty.service.js.map