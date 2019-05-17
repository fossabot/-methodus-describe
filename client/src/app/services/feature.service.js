import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from './user.context.service';
var FeatureService = /** @class */ (function () {
    function FeatureService(userService) {
        this.userService = userService;
        this.betaUsers = ['rb136m', 'ro3591', 'dk727g'];
        this.beta = false;
        var user = this.userService.getUser();
        if (user && this.betaUsers.indexOf(user.attuid) > -1) {
            this.beta = true;
        }
    }
    FeatureService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], FeatureService);
    return FeatureService;
}());
export { FeatureService };
//# sourceMappingURL=feature.service.js.map