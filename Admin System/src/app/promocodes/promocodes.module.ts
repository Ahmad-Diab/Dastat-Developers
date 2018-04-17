import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PromocodesRoutes } from './promocodes.routing';
import { ViewPromocodesComponent } from './view-promocodes/view-promocodes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PromocodesRoutes)
  ],
  declarations: [ViewPromocodesComponent]
})

export class PromocodesModule {}
