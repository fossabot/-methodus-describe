import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var DictionaryPipe = /** @class */ (function () {
    function DictionaryPipe() {
    }
    DictionaryPipe.prototype.transform = function (value, field, dictionaryForAudit) {
        if (value === '') {
            return value;
        }
        if (dictionaryForAudit[field]) {
            dictionaryForAudit[field].forEach(function (item) {
                if (item.name === value) {
                    value = item.description || item.name;
                }
            });
        }
        return value;
    };
    DictionaryPipe = tslib_1.__decorate([
        Pipe({ name: 'dictionary' })
    ], DictionaryPipe);
    return DictionaryPipe;
}());
export { DictionaryPipe };
//# sourceMappingURL=dictionary-pipe.js.map