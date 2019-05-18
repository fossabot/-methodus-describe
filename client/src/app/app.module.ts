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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { SharedModule } from './shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserService } from './services/user.context.service';
import { appRoutes } from './routes';

import { FeatureService } from './services/feature.service';
import { RefreshService } from './services/refresh.service';
import { JwtModule } from '@auth0/angular-jwt';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}



@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    HttpClientModule,


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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true } // <-- debugging purposes only
    ),
  ],
  providers: [
    RefreshService,
    UserService,
    FeatureService,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
