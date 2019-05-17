import * as tslib_1 from "tslib";
var DataComponent = /** @class */ (function () {
    function DataComponent(_ngZone, translateService, dirtyService) {
        this._ngZone = _ngZone;
        this.translateService = translateService;
        this.dirtyService = dirtyService;
    }
    DataComponent.prototype.closeSlider = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this._ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        this.displayModalNew = 'closing';
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    DataComponent.prototype.beforeUpdate = function (item) {
    };
    DataComponent.prototype.afterUpdate = function (item) {
    };
    DataComponent.prototype.clearMeta = function () {
        var _this = this;
        Object.keys(this.item).forEach(function (key) {
            if (key.indexOf('_meta_') === 0) {
                delete _this.item[key];
            }
        });
    };
    DataComponent.prototype.saveProxy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.item._id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updateItem()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.createItem()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DataComponent.prototype.updateItem = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clearMeta();
                        this.beforeUpdate(this.item);
                        this.updateItemRunning = true;
                        this.item.Date = new Date();
                        return [4 /*yield*/, this.DataController.update(this.collectionName, this.item._id, this.item)];
                    case 1:
                        _a.sent();
                        if (this.dirtyService) {
                            this.dirtyService.clearDirty();
                        }
                        this.afterUpdate(this.item);
                        this.displayModalNew = '';
                        setTimeout(function () {
                            _this.updateItemRunning = false;
                        }, 500);
                        return [2 /*return*/];
                }
            });
        });
    };
    DataComponent.prototype.loadItems = function (query) {
        if (query === void 0) { query = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.query = {};
                        if (Object.keys(query).length) {
                            this.query = query;
                        }
                        _a = this;
                        return [4 /*yield*/, this.DataController.query(this.collectionName, this.query)];
                    case 1:
                        _a.items = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataComponent.prototype.deleteItem = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.translateService.get('DATA.CONFIRM_DELETE').subscribe(function (confirmMessage) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!confirm("" + confirmMessage)) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.DataController.delete(this.collectionName, item._id)];
                            case 1:
                                _a.sent();
                                this.loadItems();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    DataComponent.prototype.createItem = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.clearMeta();
                        this.beforeUpdate(this.item);
                        _a = this;
                        return [4 /*yield*/, this.DataController.create(this.collectionName, this.item)];
                    case 1:
                        _a.item = _b.sent();
                        if (this.dirtyService) {
                            this.dirtyService.clearDirty();
                        }
                        return [4 /*yield*/, this.loadItems()];
                    case 2:
                        _b.sent();
                        this.displayModalNew = '';
                        this.afterUpdate(this.item);
                        return [2 /*return*/];
                }
            });
        });
    };
    DataComponent.prototype.newItem = function () {
        this.item = {};
        this.displayModalNew = 'active';
    };
    DataComponent.prototype.editItem = function (item) {
        var _this = this;
        this._ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (item) {
                    this.item = item;
                }
                else {
                    this.item = {};
                }
                this.displayModalNew = 'active';
                return [2 /*return*/];
            });
        }); });
    };
    return DataComponent;
}());
export { DataComponent };
//# sourceMappingURL=data.component.js.map