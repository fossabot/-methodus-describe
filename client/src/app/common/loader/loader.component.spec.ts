import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../services/loader.service';
describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [LoaderService]
    })
      .compileComponents();
    loaderService = TestBed.get(LoaderService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
