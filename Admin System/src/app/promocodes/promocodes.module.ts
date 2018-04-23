import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PromocodesRoutes } from './promocodes.routing';
import { ViewPromocodesComponent } from './view-promocodes/view-promocodes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PromocodesRoutes),
    FormsModule
  ],
  declarations: [ViewPromocodesComponent]
})

export class PromocodesModule {}
