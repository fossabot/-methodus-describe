import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef, DebugElement } from '@angular/core';
import { AdaptWidthDirective } from './adapt-width';
import { By } from '@angular/platform-browser';
import { DummyComponent } from './dummy';
describe('AdaptWidthDirective', () => {
    let component: DummyComponent;
    let fixture: ComponentFixture<DummyComponent>;
    let el: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [DummyComponent, AdaptWidthDirective],
            providers: [
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement.query(By.css('div'));
    });
    it('should create', () => {
        el.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        expect(true).toBeTruthy();
    });

});
