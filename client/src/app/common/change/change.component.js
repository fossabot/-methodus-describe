import * as tslib_1 from "tslib";
import { Component, Input, HostListener } from '@angular/core';
import { DirtyService } from '../../services/dirty.service';
import stringify from 'fast-stringify';
var ChangeComponent = /** @class */ (function () {
    function ChangeComponent(dirtyService) {
        var _this = this;
        this.dirtyService = dirtyService;
        this.dirtyDetected = false;
        this.orgItem = {};
        this.dirtyService.detect.subscribe(function (data) {
            _this.detectChanges();
        });
    }
    ChangeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dirtyService.dirty.subscribe(function (state) {
            _this.dirtyDetected = state;
            if (!state) {
                _this.orgItem = JSON.parse(stringify(_this.item));
            }
        });
        this.dirtyService.saving.subscribe(function (state) {
        });
    };
    ChangeComponent.prototype.ngOnDestroy = function () {
        // try {
        //   this.dirtyService.dirty.unsubscribe();
        //   this.dirtyService.saving.unsubscribe();
        // } catch (ex) {
        //   console.error(ex);
        // }
    };
    ChangeComponent.prototype.canDeactivate = function () {
        return !this.dirtyDetected;
    };
    ChangeComponent.prototype.detectChanges = function () {
        if (!this.dirtyDetected) {
            var org = stringify(this.orgItem);
            var current = stringify(this.item);
            if (org !== current) {
                this.dirtyDetected = true;
                this.dirtyService.setDirty();
            }
        }
    };
    ChangeComponent.prototype.ngOnChanges = function (changes) {
        this.orgItem = JSON.parse(stringify(this.item));
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ChangeComponent.prototype, "item", void 0);
    tslib_1.__decorate([
        HostListener('window:beforeunload'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Boolean)
    ], ChangeComponent.prototype, "canDeactivate", null);
    ChangeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-changes',
            templateUrl: './change.component.html',
        }),
        tslib_1.__metadata("design:paramtypes", [DirtyService])
    ], ChangeComponent);
    return ChangeComponent;
}());
export { ChangeComponent };
//# sourceMappingURL=change.component.js.map