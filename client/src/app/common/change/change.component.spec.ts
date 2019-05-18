import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeComponent } from './change.component';
import { SharedModule } from '../../shared.module';
import { DescribeModule } from '../../describe/describe.module';

describe('ChangeComponent', () => {
  let component: ChangeComponent;
  let fixture: ComponentFixture<ChangeComponent>;

  it('should create ChangeComponent', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, DescribeModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(ChangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
