import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { HallRoutes } from './hall.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HallRoutes),
    FormsModule
  ],
  declarations: [LayoutComponent,]
})
export class HallModule { }
