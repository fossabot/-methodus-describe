import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.module';
import { SharedModule } from './shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CompaniesComponent } from './companies/companies.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.context.service';
import { LobbyComponent } from './common/lobby/lobby.component';

import { CompaniesAdminComponent } from './companies-admin/companies.admin.component';
import { FooterComponent } from './footer/footer.component';
import { appRoutes } from './routes';
import { MenuComponent } from './menu/menu.component';
import { FeatureService } from './services/feature.service';
import { CompanyFormComponent } from './company-form/company-form.component';
import { RefreshService } from './services/refresh.service';

describe('AppComponent', () => {
  let translate: TranslateService;
  let http: HttpTestingController;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return sessionStorage.getItem('access_token');
            }
          }
        }),
        RouterTestingModule.withRoutes(appRoutes),

        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        FooterComponent,
        DashboardComponent,
        CompaniesComponent,
        LobbyComponent,
        CompaniesAdminComponent,
        CompanyFormComponent,
      ],
      providers: [
        TranslateService,
        UserService,
        FeatureService,
        RefreshService,
      ]
    }).compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);

  }));


});
