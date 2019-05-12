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

import { JwtModule } from '@auth0/angular-jwt';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { SharedModule } from './shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LobbyComponent } from './common/lobby/lobby.component';
import { UserService } from './services/user.context.service';
import { LoaderService } from './services/loader.service';
import { FooterComponent } from './footer/footer.component';
import { appRoutes } from './routes';
import { MenuComponent } from './menu/menu.component';
import { FeatureService } from './services/feature.service';
import { RefreshService } from './services/refresh.service';
import { ApiRoutesComponent } from './api-routes/api-routes.component';
import { TestFormComponent } from './test-form/test-form.component';
import { TestRouteService } from './services/test-route.service';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '/describe/assets',
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => {
    const _monaco = (<any>window).monaco;
    // validation settings

    _monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  } // here monaco object will be available as window.monaco use this function to extend monaco editor functionality.
};


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LobbyComponent,
    FooterComponent,
    MenuComponent,
    ApiRoutesComponent,
    TestFormComponent,

  ],

  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MonacoEditorModule.forRoot(monacoConfig),
    SharedModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true } // <-- debugging purposes only
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
    JwtModule.forRoot({
      config: {
        tokenGetter,
      }
    })
  ],
  providers: [
    RefreshService,
    LoaderService,
    UserService,
    FeatureService,
    TestRouteService,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
