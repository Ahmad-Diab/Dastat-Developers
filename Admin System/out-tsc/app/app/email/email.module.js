var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { EmailComponent } from './email.component';
import { EmailRoutes } from './email.routing';
var EmailModule = (function () {
    function EmailModule() {
    }
    EmailModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule.forChild(EmailRoutes), SidebarModule],
            declarations: [EmailComponent]
        })
    ], EmailModule);
    return EmailModule;
}());
export { EmailModule };
//# sourceMappingURL=email.module.js.map