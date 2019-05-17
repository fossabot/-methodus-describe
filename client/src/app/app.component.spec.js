import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.module';
import { SharedModule } from './shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.context.service';
import { LobbyComponent } from './common/lobby/lobby.component';
import { FooterComponent } from './footer/footer.component';
import { appRoutes } from './routes';
import { MenuComponent } from './menu/menu.component';
import { FeatureService } from './services/feature.service';
import { RefreshService } from './services/refresh.service';
describe('AppComponent', function () {
    var translate;
    var http;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                FormsModule,
                ReactiveFormsModule,
                JwtModule.forRoot({
                    config: {
                        tokenGetter: function () {
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
                LobbyComponent,
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
//# sourceMappingURL=app.component.spec.js.map