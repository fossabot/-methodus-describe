import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.context.service';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(userService, route, router, location, _ngZone) {
        var _this = this;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this._ngZone = _ngZone;
        this.subMenuState = 'collapse';
        this.toggles = {
            aws: false,
            admin: false,
        };
        this.activeClass = '';
        this.relevantItems = [
            '/dashboard/aws/cloudformation',
            '/dashboard/aws/ec2',
            '/dashboard/aws/cloudwatch',
        ];
        router.events.subscribe(function (val) {
            _this._ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (this.relevantItems.indexOf(location.path()) > -1) {
                        this._notRelevant = false;
                    }
                    else {
                        this._notRelevant = true;
                    }
                    return [2 /*return*/];
                });
            }); });
        });
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.user = this.userService.getUser();
        this.permissions = this.userService.loadPermissions();
    };
    MenuComponent.prototype.toggleDrop = function (key, toggle) {
        this.toggles[key] = toggle;
    };
    MenuComponent.prototype.notRelevant = function () {
        return this._notRelevant;
    };
    MenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService,
            ActivatedRoute,
            Router,
            Location,
            NgZone])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map