import { async, TestBed } from '@angular/core/testing';
import { TestFormComponent } from './test-form.component';
import { SharedModule } from '../../shared.module';
import { DescribeModule } from '../describe.module';
describe('TestFormComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [SharedModule, DescribeModule],
            declarations: [TestFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TestFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=test-form.component.spec.js.map