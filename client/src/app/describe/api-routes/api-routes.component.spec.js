import { async, TestBed } from '@angular/core/testing';
import { ApiRoutesComponent } from './api-routes.component';
import { SharedModule } from '../../shared.module';
describe('ApiRoutesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            declarations: [ApiRoutesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ApiRoutesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=api-routes.component.spec.js.map