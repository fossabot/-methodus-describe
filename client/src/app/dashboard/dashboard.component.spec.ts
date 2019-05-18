import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared.module';
import { DashboardComponent } from './dashboard.component';

export function getToken(): string {
  return sessionStorage.getItem('token');
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
