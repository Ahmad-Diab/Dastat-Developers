import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HallsComponent } from './halls/halls.component';
import { LayoutsComponent } from './layouts/layouts.component';

export const HallRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'layout/:id',
            component: LayoutComponent,
            data: {
                heading: 'Layout'
            }
        },{
            path: 'all',
            component: HallsComponent,
            data: {
                heading: 'Halls'
            }
        },{
            path: 'layouts',
            component: LayoutsComponent,
            data: {
                heading: 'Layouts'
            }
        }]
    } ,
];
