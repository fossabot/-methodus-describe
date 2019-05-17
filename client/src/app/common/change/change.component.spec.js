import { async, TestBed } from '@angular/core/testing';
import { DirtyService } from '../../services/dirty.service';
import { ChangeComponent } from './change.component';
describe('ChangeComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ChangeComponent],
            providers: [DirtyService]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ChangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=change.component.spec.js.map