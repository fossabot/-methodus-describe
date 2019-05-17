import * as tslib_1 from "tslib";
import { Injectable, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
var UserService = /** @class */ (function () {
    function UserService(jwtHelper) {
        this.jwtHelper = jwtHelper;
        this.groupChanges = [];
    }
    UserService.prototype.setUser = function (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
    };
    UserService.prototype.setToken = function (token) {
        sessionStorage.setItem('token', token);
    };
    UserService.prototype.loadPermissions = function () {
        return {};
    };
    UserService.prototype.isDelegated = function (user) {
        if (user.delegated && user.delegatedUntil && user.delegatedUntil.value) {
            var untilDate = new Date(user.delegatedUntil.value);
            var now = new Date();
            if (untilDate > now) {
                return true;
            }
        }
        return false;
    };
    UserService.prototype.isAuthenticated = function () {
        var token = sessionStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        var isExpired = this.jwtHelper.isTokenExpired(token);
        return !isExpired;
    };
    UserService.prototype.getUser = function () {
        var str = sessionStorage.getItem('user');
        if (str) {
            return JSON.parse(str);
        }
        return null;
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], UserService.prototype, "group", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], UserService.prototype, "user", void 0);
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [JwtHelperService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.context.service.js.map