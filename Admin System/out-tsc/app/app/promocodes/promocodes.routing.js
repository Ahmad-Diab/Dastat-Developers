import { ViewPromocodesComponent } from './view-promocodes/view-promocodes.component';
export var PromocodesRoutes = [
    {
        path: '',
        children: [{
                path: '',
                component: ViewPromocodesComponent,
                data: {
                    heading: 'Promocodes'
                }
            }]
    }
];
//# sourceMappingURL=promocodes.routing.js.map