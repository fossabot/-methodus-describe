import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { SharedModule } from '../../shared.module';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then((resolve) => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
