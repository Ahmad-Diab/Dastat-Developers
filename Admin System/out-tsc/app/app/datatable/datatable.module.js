var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatatableRoutes } from './datatable.routing';
import { DataTableComponent } from './data-table/data-table.component';
import { TableEditingComponent } from './table-editing/table-editing.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { TablePagingComponent } from './table-paging/table-paging.component';
import { TablePinningComponent } from './table-pinning/table-pinning.component';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { TableSortingComponent } from './table-sorting/table-sorting.component';
var DatatableModule = (function () {
    function DatatableModule() {
    }
    DatatableModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(DatatableRoutes),
                NgxDatatableModule
            ],
            declarations: [
                DataTableComponent,
                TableEditingComponent,
                TableFilterComponent,
                TablePagingComponent,
                TablePinningComponent,
                TableSelectionComponent,
                TableSortingComponent
            ]
        })
    ], DatatableModule);
    return DatatableModule;
}());
export { DatatableModule };
//# sourceMappingURL=datatable.module.js.map