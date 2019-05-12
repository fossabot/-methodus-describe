import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DirtyService } from '../../services/dirty.service';
import { ChangeComponent } from './change.component';

describe('ChangeComponent', () => {
  let component: ChangeComponent;
  let fixture: ComponentFixture<ChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeComponent],
      providers: [DirtyService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
