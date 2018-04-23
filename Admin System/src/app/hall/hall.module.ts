import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { HallRoutes } from './hall.routing';
import { FormsModule } from '@angular/forms';
import { HallsComponent } from './halls/halls.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(HallRoutes),
    FormsModule
  ],
  declarations: [LayoutComponent, HallsComponent,]
})
export class HallModule { }
