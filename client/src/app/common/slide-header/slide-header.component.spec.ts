import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideHeaderComponent } from './slide-header.component';
import { SharedModule } from '../../shared.module';
import { DescribeModule } from '../../describe/describe.module';


describe('SlideHeaderComponent', () => {
  let component: SlideHeaderComponent;
  let fixture: ComponentFixture<SlideHeaderComponent>;
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, DescribeModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(SlideHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
