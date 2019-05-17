import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var HumanizePipe = /** @class */ (function () {
    function HumanizePipe() {
    }
    HumanizePipe.prototype.transform = function (value, field, data, data2) {
        if (value === '') {
            return value;
        }
        value = value.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    };
    HumanizePipe = tslib_1.__decorate([
        Pipe({ name: 'humanize' })
    ], HumanizePipe);
    return HumanizePipe;
}());
export { HumanizePipe };
//# sourceMappingURL=humanize-pipe.js.map