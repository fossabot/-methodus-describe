import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestFormComponent } from './test-form.component';
import { SharedModule } from '../../app/shared.module';
import { DescribeModule } from '../describe.module';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, DescribeModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(TestFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
