var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing';
import { InvoiceComponent } from './invoice/invoice.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PricingComponent } from './pricing/pricing.component';
import { ForumComponent } from './forum/forum.component';
import { ActivtyComponent } from './activty/activty.component';
import { BlankComponent } from './blank/blank.component';
var PagesModule = (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(PagesRoutes)
            ],
            declarations: [InvoiceComponent, TimelineComponent, PricingComponent, ForumComponent, ActivtyComponent, BlankComponent]
        })
    ], PagesModule);
    return PagesModule;
}());
export { PagesModule };
//# sourceMappingURL=pages.module.js.map