var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MediaRoutes } from './media.routing';
import { GridComponent } from './grid/grid.component';
import { TileComponent } from './tile/tile.component';
import { ListComponent } from './list/list.component';
var MediaModule = (function () {
    function MediaModule() {
    }
    MediaModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(MediaRoutes),
                NgbTooltipModule
            ],
            declarations: [GridComponent, TileComponent, ListComponent]
        })
    ], MediaModule);
    return MediaModule;
}());
export { MediaModule };
//# sourceMappingURL=media.module.js.map