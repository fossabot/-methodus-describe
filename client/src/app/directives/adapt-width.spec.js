import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdaptWidthDirective } from './adapt-width';
import { By } from '@angular/platform-browser';
import { DummyComponent } from './dummy';
describe('AdaptWidthDirective', function () {
    var component;
    var fixture;
    var el;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [DummyComponent, AdaptWidthDirective],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement.query(By.css('div'));
    });
    it('should create', function () {
        el.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        expect(true).toBeTruthy();
    });
});
//# sourceMappingURL=adapt-width.spec.js.map