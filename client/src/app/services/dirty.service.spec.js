import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DirtyService } from '../services/dirty.service';
describe('DirtyService', function () {
    var service;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [DirtyService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        service = new DirtyService();
        window.confirm = (function () { return true; });
    });
    it('should setDirty dialog true', function () {
        service.setDirty();
        service.dirty.subscribe(function (value) {
            expect(value).toBeTruthy();
        });
    });
    it('should setDirty dialog false', function () {
        service.clearDirty();
        service.dirty.subscribe(function (value) {
            expect(value).toBeFalsy();
        });
    });
    it('should warn dirty', function () {
        service.setDirty();
        var res = service.warn();
        expect(res).toBeTruthy();
    });
    it('should warn', function () {
        service.clearDirty();
        var res = service.warn();
        expect(res).toBeTruthy();
    });
    it('should setSaving true', function () {
        service.setSaving();
        service.saving.subscribe(function (value) {
            expect(value).toBeTruthy();
        });
    });
    it('should clearSaving false', function () {
        service.clearSaving();
        service.saving.subscribe(function (value) {
            expect(value).toBeFalsy();
        });
    });
    it('should detectChanges', function () {
        service.clearDirty();
        service.detectChanges();
        service.detect.subscribe(function (value) {
            expect(value).toBeFalsy();
        });
    });
});
//# sourceMappingURL=dirty.service.spec.js.map