import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.toggle = function () {
        this._on = !this._on;
    };
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map