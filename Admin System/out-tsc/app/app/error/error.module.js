var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorRoutes } from './error.routing';
import { Error4Component } from './error4/error4.component';
import { Error5Component } from './error5/error5.component';
import { Error503Component } from './error503/error503.component';
var ErrorModule = (function () {
    function ErrorModule() {
    }
    ErrorModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(ErrorRoutes)
            ],
            declarations: [Error4Component, Error5Component, Error503Component]
        })
    ], ErrorModule);
    return ErrorModule;
}());
export { ErrorModule };
//# sourceMappingURL=error.module.js.map