import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiRoutesComponent } from './describe/api-routes/api-routes.component';
import { TestFormComponent } from './describe/test-form/test-form.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard/local-services', pathMatch: 'full' },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            {
                path: 'local-services', component: ApiRoutesComponent, children: [
                    { path: ':controller/:method', component: TestFormComponent },
                ]
            },
            { path: 'remote-services', component: ApiRoutesComponent },
            { path: 'event-services', component: ApiRoutesComponent },
        ]
    },
];
