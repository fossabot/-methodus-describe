import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoaderService } from '../services/loader.service';

describe('LoaderService', () => {
    let service: LoaderService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [],
            providers: [LoaderService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        service = new LoaderService();
    });


    it('should set busy true', () => {
        service.setBusy();
        service.getSubscription('main').subscribe((value: boolean) => {
            expect(value).toBeTruthy();
        });
    });
    it('should set busy false', () => {
        service.clearBusy();
        service.getSubscription('main').subscribe((value: boolean) => {
            expect(value).toBeFalsy();
        });
    });
});
