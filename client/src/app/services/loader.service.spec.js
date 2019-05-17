import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoaderService } from '../services/loader.service';
describe('LoaderService', function () {
    var service;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [LoaderService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        service = new LoaderService();
    });
    it('should set busy true', function () {
        service.setBusy();
        service.getSubscription('main').subscribe(function (value) {
            expect(value).toBeTruthy();
        });
    });
    it('should set busy false', function () {
        service.clearBusy();
        service.getSubscription('main').subscribe(function (value) {
            expect(value).toBeFalsy();
        });
    });
});
//# sourceMappingURL=loader.service.spec.js.map