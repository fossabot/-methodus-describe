import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var arr = Object.keys(value);
        arr.sort(function (a, b) {
            return a > b ? 1 : -1;
        });
        return arr;
    };
    KeysPipe = tslib_1.__decorate([
        Pipe({
            name: 'keys'
        })
    ], KeysPipe);
    return KeysPipe;
}());
export { KeysPipe };
//# sourceMappingURL=keys-pipe.js.map