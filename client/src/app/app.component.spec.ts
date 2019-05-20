import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { appRoutes } from './routes';
import { MenuComponent } from './menu/menu.component';
import { RefreshService } from './services/refresh.service';

describe('AppComponent', () => {




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        FooterComponent,
      ],
      providers: [
        RefreshService,
      ]
    }).compileComponents();

  }));
});
