import { BasicComponent } from './basic/basic.component';
import { ResponsiveComponent } from './responsive/responsive.component';
export var TablesRoutes = [
    {
        path: '',
        children: [{
                path: 'basic',
                component: BasicComponent,
                data: {
                    heading: 'Basic table'
                }
            }, {
                path: 'responsive',
                component: ResponsiveComponent,
                data: {
                    heading: 'Responsive'
                }
            }]
    }
];
//# sourceMappingURL=tables.routing.js.map