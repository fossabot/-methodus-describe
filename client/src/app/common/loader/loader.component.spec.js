import { async, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../services/loader.service';
describe('LoaderComponent', function () {
    var component;
    var fixture;
    var loaderService;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LoaderComponent],
            providers: [LoaderService]
        })
            .compileComponents();
        loaderService = TestBed.get(LoaderService);
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=loader.component.spec.js.map