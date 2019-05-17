import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared.module';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { UserService } from '../services/user.context.service';
export function getToken() {
    return sessionStorage.getItem('token');
}
describe('DashboardComponent', function () {
    var component;
    var fixture;
    var translate;
    var http;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                FormsModule,
            ],
            declarations: [DashboardComponent],
            providers: [UserService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        translate = TestBed.get(TranslateService);
        http = TestBed.get(HttpTestingController);
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard.component.spec.js.map