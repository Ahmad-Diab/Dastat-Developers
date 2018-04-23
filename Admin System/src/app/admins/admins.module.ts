import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingUsher } from './booking-usher/booking-usher.component';
import { AdminsRoutes } from './admins.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatatableRoutes } from '../datatable/datatable.routing';
import { DataTableComponent } from '../datatable/data-table/data-table.component';
import { TableEditingComponent } from '../datatable/table-editing/table-editing.component';
import { TableFilterComponent } from '../datatable/table-filter/table-filter.component';
import { TablePagingComponent } from '../datatable/table-paging/table-paging.component';
import { TablePinningComponent } from '../datatable/table-pinning/table-pinning.component';
import { TableSelectionComponent } from '../datatable/table-selection/table-selection.component';
import { TableSortingComponent } from '../datatable/table-sorting/table-sorting.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { CinemaOwnerComponent } from './cinema-owner/cinema-owner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminsRoutes),
    NgxDatatableModule
  ],
  declarations: [
    BookingUsher,
    DataTableComponent,
    TableEditingComponent,
    TableFilterComponent,
    TablePagingComponent,
    TablePinningComponent,
    TableSelectionComponent,
    TableSortingComponent,
    ViewAdminComponent,
    BranchManagerComponent,
    CinemaOwnerComponent
  ]
})
export class AdminsModule { }
