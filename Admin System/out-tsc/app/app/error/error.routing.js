import { Error4Component } from './error4/error4.component';
import { Error5Component } from './error5/error5.component';
import { Error503Component } from './error503/error503.component';
export var ErrorRoutes = [
    {
        path: '',
        children: [{
                path: '404',
                component: Error4Component
            }, {
                path: '500',
                component: Error5Component
            }, {
                path: '503',
                component: Error503Component
            }]
    }
];
//# sourceMappingURL=error.routing.js.map