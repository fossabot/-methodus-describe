import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateStore, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AccordionModule, AccordionConfig } from 'ngx-bootstrap/accordion';
import { LobbyComponent } from './lobby.component';
import { LobbyItemComponent } from '../lobby.item/lobby.item.component';
import { KeysPipe } from '../../pipes/keys-pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { JoyrideModule } from 'ngx-joyride';
import { LoaderService } from '../../services/loader.service';
import { LoaderComponent } from '../loader/loader.component';
describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;
  let loaderService: LoaderService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AccordionModule.forRoot(),
        JoyrideModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }), HttpClientTestingModule
      ],
      declarations: [LobbyComponent, LobbyItemComponent, KeysPipe, LoaderComponent],
      providers: [TranslateService, TranslateStore, LoaderService],
    })
      .compileComponents();

    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
    loaderService = TestBed.get(LoaderService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
