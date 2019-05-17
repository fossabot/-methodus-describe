import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, TemplateRef, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
var LobbyComponent = /** @class */ (function () {
    function LobbyComponent(_ngZone, ref) {
        this._ngZone = _ngZone;
        this.ref = ref;
        this.noNew = false;
        this.deleteItem = new EventEmitter();
        this.editItem = new EventEmitter();
        this.newItem = new EventEmitter();
        this.selectItem = new EventEmitter();
        this.itemsHolder = [];
        this.itemsGroup = {};
        this.isFirstOpen = true;
    }
    LobbyComponent.prototype.handleSubscription = function (value) {
        var _this = this;
        this._ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                this.items = this.itemsHolder;
                result = this.items.filter(function (item) {
                    if (!value) {
                        return item;
                    }
                    if (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                        return item;
                    }
                });
                this.items = result;
                this.groupedItems(result, 'type');
                this.ref.detectChanges();
                return [2 /*return*/];
            });
        }); });
    };
    LobbyComponent.prototype.deleteItemHandler = function (item) {
        this.deleteItem.emit(item);
    };
    LobbyComponent.prototype.editItemHandler = function (item) {
        this.clearSelection();
        item._meta_active = '_meta_active';
        this.editItem.emit(item);
    };
    LobbyComponent.prototype.newItemHandler = function (item) {
        this.newItem.emit(item);
    };
    LobbyComponent.prototype.clearSelection = function () {
        this.items.forEach(function (it) {
            delete it._meta_active;
        });
    };
    LobbyComponent.prototype.selectItemHandler = function (item) {
        this.clearSelection();
        item._meta_active = '_meta_active';
        this.selectItem.emit(item);
    };
    LobbyComponent.prototype.groupedItems = function (value, groupByField) {
        var _this = this;
        this._ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                result = value.reduce(function (r, a) {
                    r[a[groupByField]] = r[a[groupByField]] || [];
                    r[a[groupByField]].push(a);
                    return r;
                }, Object.create({}));
                Object.keys(result).forEach(function (key) {
                    result[key] = _this.sortArray(result[key]);
                });
                this.itemsGroup = result;
                return [2 /*return*/];
            });
        }); });
    };
    LobbyComponent.prototype.sortArray = function (companiesList) {
        if (companiesList) {
            return companiesList.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
        }
        else {
            return [];
        }
    };
    LobbyComponent.prototype.getHeading = function (key, length) {
        return key + " (" + length + ")";
    };
    LobbyComponent.prototype.ngOnInit = function () {
        if (this.items) {
            this.items = this.sortArray(this.items);
            this.itemsHolder = this.items;
            this.groupedItems(this.items, 'type');
        }
    };
    LobbyComponent.prototype.ngOnDestroy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.searchSubscription) {
                    this.searchSubscription.unsubscribe();
                }
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], LobbyComponent.prototype, "template", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], LobbyComponent.prototype, "itemTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], LobbyComponent.prototype, "items", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LobbyComponent.prototype, "model", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LobbyComponent.prototype, "noNew", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LobbyComponent.prototype, "mode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LobbyComponent.prototype, "iconClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LobbyComponent.prototype, "groupBy", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], LobbyComponent.prototype, "itemClass", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LobbyComponent.prototype, "deleteItem", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LobbyComponent.prototype, "editItem", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LobbyComponent.prototype, "newItem", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LobbyComponent.prototype, "selectItem", void 0);
    LobbyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-lobby',
            templateUrl: './lobby.component.html',
            styleUrls: ['./lobby.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [NgZone, ChangeDetectorRef])
    ], LobbyComponent);
    return LobbyComponent;
}());
export { LobbyComponent };
//# sourceMappingURL=lobby.component.js.map