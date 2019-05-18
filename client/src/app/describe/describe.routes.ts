import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestFormComponent } from './test-form/test-form.component';
import { ApiRoutesComponent } from './api-routes/api-routes.component';
import { Routes } from '@angular/router';

export const describeRoutes: Routes = [
  {
    path: 'local-services', component: ApiRoutesComponent, children: [
      { path: ':controller/:method', component: TestFormComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(describeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DescribeRoutingModule { }
