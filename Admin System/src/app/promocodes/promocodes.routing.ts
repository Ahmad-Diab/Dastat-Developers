import { Routes } from '@angular/router';

import { ViewPromocodesComponent } from './view-promocodes/view-promocodes.component';

export const PromocodesRoutes: Routes = [
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
