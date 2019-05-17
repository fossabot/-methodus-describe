import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideFooterComponent } from './slide-footer.component';
import { SharedModule } from '../../shared.module';

describe('SlideFooterComponent', () => {
  let component: SlideFooterComponent;
  let fixture: ComponentFixture<SlideFooterComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(SlideFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
