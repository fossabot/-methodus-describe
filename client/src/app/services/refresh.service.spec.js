import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RefreshService } from '../services/refresh.service';
describe('RefreshService', function () {
    var service;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [RefreshService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        service = new RefreshService();
    });
    it('should subscription', function () {
        var name = 'test';
        var value = 'testValue';
        service.subscription(name).subscribe(function () {
            expect(service).toBeTruthy();
        });
        service.refresh(name, value);
    });
});
//# sourceMappingURL=refresh.service.spec.js.map