var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
var ForgotComponent = (function () {
    function ForgotComponent(fb, router) {
        this.fb = fb;
        this.router = router;
    }
    ForgotComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            uname: [null, Validators.compose([Validators.required])]
        });
    };
    ForgotComponent.prototype.onSubmit = function () {
        this.router.navigate(['/']);
    };
    ForgotComponent = __decorate([
        Component({
            selector: 'app-forgot',
            templateUrl: './forgot.component.html',
            styleUrls: ['./forgot.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router])
    ], ForgotComponent);
    return ForgotComponent;
}());
export { ForgotComponent };
//# sourceMappingURL=forgot.component.js.map