import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { describeRoutes } from './describe/describe.routes';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard/local-services', pathMatch: 'full' },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [

            ...describeRoutes


        ]
    },
];
