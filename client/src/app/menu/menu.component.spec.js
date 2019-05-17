import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from '../services/user.context.service';
import { LoaderService } from '../services/loader.service';
export function getToken() {
    return sessionStorage.getItem('token');
}
describe('MenuComponent', function () {
    var component;
    var fixture;
    var loaderService;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                FormsModule,
                RouterTestingModule,
                JwtModule.forRoot({
                    config: {
                        tokenGetter: getToken
                    }
                }),
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                }), HttpClientTestingModule
            ],
            providers: [
                UserService,
                LoaderService
            ],
            declarations: [MenuComponent]
        })
            .compileComponents();
        loaderService = TestBed.get(LoaderService);
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=menu.component.spec.js.map