import { NgModule, ModuleWithProviders } from '@angular/core';

import { TestFormComponent } from './test-form/test-form.component';
import { ApiRoutesComponent } from './api-routes/api-routes.component';
import { TestRouteService } from './test-route.service';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import { SharedModule } from '../app/shared.module';
import { Routes, RouterModule } from '@angular/router';


export const describeRoutes: Routes = [
  { path: '', redirectTo: 'local-services', pathMatch: 'full' },
  {
    path: ':type', component: ApiRoutesComponent, children: [
      { path: ':controller/:method', component: TestFormComponent },
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AccordionModule.forRoot(),
    RouterModule.forChild(describeRoutes),

  ],
  declarations: [
    TestFormComponent,
    ApiRoutesComponent,
  ],
  entryComponents: [ApiRoutesComponent],
  providers: [
    TestRouteService,
  ],
  exports: [
    TestFormComponent,
    ApiRoutesComponent,
    RouterModule,

  ],
})



export class DescribeModule {
  constructor() {
    // this language will be used as a fallback when a translation isn't found in the current language

  }

  static forRoot(loader): ModuleWithProviders {
    return {
      ngModule: DescribeModule,
      providers: [TestRouteService],
    };
  }
}
