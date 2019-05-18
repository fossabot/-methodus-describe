import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard/describe/local-services', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [

            {
                path: 'describe',
                loadChildren: '../describe/describe.module#DescribeModule'
            }
        ],


    }
];
