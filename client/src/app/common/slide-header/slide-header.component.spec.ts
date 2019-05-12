import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideHeaderComponent } from './slide-header.component';
import { DirtyService } from '../../services/dirty.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';

describe('SlideHeaderComponent', () => {
  let component: SlideHeaderComponent;
  let fixture: ComponentFixture<SlideHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],

      providers: [DirtyService],
      declarations: [SlideHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
