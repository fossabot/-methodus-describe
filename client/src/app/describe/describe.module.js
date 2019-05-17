import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { TestFormComponent } from './test-form/test-form.component';
import { ApiRoutesComponent } from './api-routes/api-routes.component';
import { TestRouteService } from './test-route.service';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared.module';
var DescribeModule = /** @class */ (function () {
    function DescribeModule() {
        // this language will be used as a fallback when a translation isn't found in the current language
    }
    DescribeModule_1 = DescribeModule;
    DescribeModule.forRoot = function (loader) {
        return {
            ngModule: DescribeModule_1,
            providers: [TestRouteService],
        };
    };
    var DescribeModule_1;
    DescribeModule = DescribeModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                SharedModule,
                FormsModule,
                AccordionModule.forRoot(),
            ],
            declarations: [
                TestFormComponent,
                ApiRoutesComponent,
            ],
            providers: [
                TestRouteService,
            ],
            exports: [],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DescribeModule);
    return DescribeModule;
}());
export { DescribeModule };
//# sourceMappingURL=describe.module.js.map