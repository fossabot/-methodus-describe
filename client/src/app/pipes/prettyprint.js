import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var PrettyPrintPipe = /** @class */ (function () {
    function PrettyPrintPipe() {
    }
    PrettyPrintPipe.prototype.transform = function (val) {
        return JSON.stringify(val, null, 2)
            .replace(' ', '&nbsp;')
            .replace('\n', '<br/>');
    };
    PrettyPrintPipe = tslib_1.__decorate([
        Pipe({
            name: 'prettyprint'
        })
    ], PrettyPrintPipe);
    return PrettyPrintPipe;
}());
export { PrettyPrintPipe };
//# sourceMappingURL=prettyprint.js.map