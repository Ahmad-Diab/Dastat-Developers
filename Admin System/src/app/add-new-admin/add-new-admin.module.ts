import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { BookingUsherComponent } from './booking-usher/booking-usher.component';
import { CinemaOwnerComponent } from './cinema-owner/cinema-owner.component';
import { RouterModule } from '@angular/router';
import { AddNewAdminRoutes } from './add-new-admin.routing';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule , RouterModule.forChild(AddNewAdminRoutes),
    FormsModule 
  ],
declarations: [BranchManagerComponent, BookingUsherComponent,CinemaOwnerComponent]
})
export class AddNewAdminModule {



 }
