import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { HallRoutes } from './hall.routing';
import { FormsModule } from '@angular/forms';
import { HallsComponent } from './halls/halls.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutsComponent } from './layouts/layouts.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(HallRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [LayoutComponent, HallsComponent, LayoutsComponent,]
})
export class HallModule { }
