import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var SlideFooterComponent = /** @class */ (function () {
    function SlideFooterComponent() {
        this.closed = new EventEmitter();
    }
    SlideFooterComponent.prototype.ngOnInit = function () {
    };
    SlideFooterComponent.prototype.closeSlider = function () {
        this.closed.emit(true);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SlideFooterComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SlideFooterComponent.prototype, "className", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SlideFooterComponent.prototype, "iconClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], SlideFooterComponent.prototype, "closeFn", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], SlideFooterComponent.prototype, "closed", void 0);
    SlideFooterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-slide-footer',
            templateUrl: './slide-footer.component.html',
            styleUrls: ['./slide-footer.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SlideFooterComponent);
    return SlideFooterComponent;
}());
export { SlideFooterComponent };
//# sourceMappingURL=slide-footer.component.js.map