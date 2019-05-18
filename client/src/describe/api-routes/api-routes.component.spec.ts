import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiRoutesComponent } from './api-routes.component';
import { SharedModule } from '../../app/shared.module';
import { DescribeModule } from '../describe.module';

describe('ApiRoutesComponent', () => {
  let component: ApiRoutesComponent;
  let fixture: ComponentFixture<ApiRoutesComponent>;
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, DescribeModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(ApiRoutesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
