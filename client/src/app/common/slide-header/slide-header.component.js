import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DirtyService } from '../../services/dirty.service';
var SlideHeaderComponent = /** @class */ (function () {
    function SlideHeaderComponent(dirtyService) {
        var _this = this;
        this.dirtyService = dirtyService;
        this.closed = new EventEmitter();
        this.save = new EventEmitter();
        this.class = 'topper';
        dirtyService.dirty.subscribe(function (state) {
            _this.dirty = state;
        });
        dirtyService.saving.subscribe(function (state) {
            _this.saving = state;
        });
    }
    SlideHeaderComponent.prototype.ngOnInit = function () {
        if (this.mode === 'inline') {
            this.class = 'inline-topper';
        }
    };
    SlideHeaderComponent.prototype.saveClick = function (event) {
        this.dirtyService.setSaving();
        this.save.emit();
    };
    SlideHeaderComponent.prototype.closeSlider = function () {
        this.closed.emit(true);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SlideHeaderComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SlideHeaderComponent.prototype, "className", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SlideHeaderComponent.prototype, "mode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SlideHeaderComponent.prototype, "enableSave", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SlideHeaderComponent.prototype, "iconClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SlideHeaderComponent.prototype, "closeFn", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], SlideHeaderComponent.prototype, "toolbar", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SlideHeaderComponent.prototype, "closed", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SlideHeaderComponent.prototype, "save", void 0);
    SlideHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-slide-header',
            templateUrl: './slide-header.component.html',
            styleUrls: ['./slide-header.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [DirtyService])
    ], SlideHeaderComponent);
    return SlideHeaderComponent;
}());
export { SlideHeaderComponent };
//# sourceMappingURL=slide-header.component.js.map