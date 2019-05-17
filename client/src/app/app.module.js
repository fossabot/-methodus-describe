import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsBootstrapUIModule } from '@ng-dynamic-forms/ui-bootstrap';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ModalModule, } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { SharedModule } from './shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserService } from './services/user.context.service';
import { LoaderService } from './services/loader.service';
import { appRoutes } from './routes';
import { FeatureService } from './services/feature.service';
import { RefreshService } from './services/refresh.service';
import { DescribeModule } from './describe/describe.module';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http);
}
export function tokenGetter() {
    return sessionStorage.getItem('access_token');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                SharedModule,
                DescribeModule,
                HttpClientModule,
                // TranslateModule.forRoot({
                //   loader: {
                //     provide: TranslateLoader,
                //     useFactory: HttpLoaderFactory,
                //     deps: [HttpClient]
                //   }
                // }),
                RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true } // <-- debugging purposes only
                ),
                TabsModule.forRoot(),
                ModalModule.forRoot(),
                SortableModule.forRoot(),
                BrowserModule,
                FormsModule,
                BsDropdownModule.forRoot(),
                ReactiveFormsModule,
                OrderModule,
                DynamicFormsBootstrapUIModule,
                BrowserAnimationsModule,
            ],
            providers: [
                RefreshService,
                LoaderService,
                UserService,
                FeatureService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map