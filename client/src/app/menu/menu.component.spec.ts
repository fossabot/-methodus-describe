import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from '../services/user.context.service';
import { LoaderService } from '../services/loader.service';

export function getToken(): string {
  return sessionStorage.getItem('token');
}


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let loaderService: LoaderService;
  beforeEach(async(() => {
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

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
