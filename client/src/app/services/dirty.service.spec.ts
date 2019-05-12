import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DirtyService } from '../services/dirty.service';

describe('DirtyService', () => {
    let service: DirtyService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [],
            providers: [DirtyService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        service = new DirtyService();
        window.confirm = (() => true);
    });

    it('should setDirty dialog true', () => {
        service.setDirty();
        service.dirty.subscribe((value: boolean) => {
            expect(value).toBeTruthy();
        });

    });
    it('should setDirty dialog false', () => {
        service.clearDirty();
        service.dirty.subscribe((value: boolean) => {
            expect(value).toBeFalsy();
        });
    });

    it('should warn dirty', () => {

        service.setDirty();
        const res = service.warn();
        expect(res).toBeTruthy();
    });

    it('should warn', () => {

        service.clearDirty();
        const res = service.warn();
        expect(res).toBeTruthy();
    });


    it('should setSaving true', () => {

        service.setSaving();
        service.saving.subscribe((value: boolean) => {
            expect(value).toBeTruthy();
        });

    });
    it('should clearSaving false', () => {
        service.clearSaving();
        service.saving.subscribe((value: boolean) => {
            expect(value).toBeFalsy();
        });
    });

    it('should detectChanges', () => {
        service.clearDirty();
        service.detectChanges();
        service.detect.subscribe((value: boolean) => {
            expect(value).toBeFalsy();
        });
    });


});
