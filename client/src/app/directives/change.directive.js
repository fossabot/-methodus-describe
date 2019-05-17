import * as tslib_1 from "tslib";
import { Directive, HostListener, Input } from '@angular/core';
import { DirtyService } from '../services/dirty.service';
var DetectChangesDirective = /** @class */ (function () {
    function DetectChangesDirective(dirtyService) {
        this.dirtyService = dirtyService;
    }
    DetectChangesDirective.prototype.onChange = function (event) {
        this.dirtyService.setDirty();
    };
    DetectChangesDirective.prototype.onKeyup = function (event) {
        this.dirtyService.setDirty();
    };
    tslib_1.__decorate([
        Input('detectChanges'),
        tslib_1.__metadata("design:type", Boolean)
    ], DetectChangesDirective.prototype, "detectChanges", void 0);
    tslib_1.__decorate([
        HostListener('change', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DetectChangesDirective.prototype, "onChange", null);
    tslib_1.__decorate([
        HostListener('keyup', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DetectChangesDirective.prototype, "onKeyup", null);
    DetectChangesDirective = tslib_1.__decorate([
        Directive({
            selector: '[detectChanges]'
        }),
        tslib_1.__metadata("design:paramtypes", [DirtyService])
    ], DetectChangesDirective);
    return DetectChangesDirective;
}());
export { DetectChangesDirective };
//# sourceMappingURL=change.directive.js.map