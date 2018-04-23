var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsRoutes } from './icons.routing';
import { LineaComponent } from './linea/linea.component';
import { FontawesomeComponent } from './fontawesome/fontawesome.component';
import { SliComponent } from './sli/sli.component';
var IconsModule = (function () {
    function IconsModule() {
    }
    IconsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(IconsRoutes),
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [LineaComponent, FontawesomeComponent, SliComponent]
        })
    ], IconsModule);
    return IconsModule;
}());
export { IconsModule };
//# sourceMappingURL=icons.module.js.map