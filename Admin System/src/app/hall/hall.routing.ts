import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const HallRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'layout/:id',
            component: LayoutComponent,
            data: {
                heading: 'Layout'
            }
        }]
    }
];
