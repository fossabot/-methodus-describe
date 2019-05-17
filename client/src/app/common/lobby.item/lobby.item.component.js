import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
var LobbyItemComponent = /** @class */ (function () {
    function LobbyItemComponent() {
    }
    LobbyItemComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], LobbyItemComponent.prototype, "template", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LobbyItemComponent.prototype, "item", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LobbyItemComponent.prototype, "model", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LobbyItemComponent.prototype, "iconClass", void 0);
    LobbyItemComponent = tslib_1.__decorate([
        Component({
            selector: 'app-lobby-item',
            templateUrl: './lobby.item.component.html',
            styleUrls: ['./lobby.item.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], LobbyItemComponent);
    return LobbyItemComponent;
}());
export { LobbyItemComponent };
//# sourceMappingURL=lobby.item.component.js.map