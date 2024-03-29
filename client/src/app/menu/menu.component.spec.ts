import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared.module';
export function getToken(): string {
  return sessionStorage.getItem('token');
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  it('should create MenuComponent', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
