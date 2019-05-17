import { async, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateStore, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
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
describe('LobbyComponent', function () {
    var component;
    var fixture;
    var translate;
    var http;
    var loaderService;
    beforeEach(async(function () {
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
    beforeEach(function () {
        fixture = TestBed.createComponent(LobbyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lobby.component.spec.js.map