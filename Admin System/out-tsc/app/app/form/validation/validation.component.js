var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
var ValidationComponent = (function () {
    function ValidationComponent() {
        this.num = 5;
    }
    ValidationComponent.prototype.ngOnInit = function () {
        var password = new FormControl('', Validators.required);
        var certainPassword = new FormControl('', CustomValidators.notEqualTo(password));
        this.form = new FormGroup({
            password: password,
            certainPassword: certainPassword
        });
    };
    ValidationComponent.prototype.onSubmit = function (form) {
        console.log(form);
    };
    ValidationComponent = __decorate([
        Component({
            selector: 'app-validation',
            templateUrl: './validation.component.html',
            styleUrls: ['./validation.component.scss']
        })
    ], ValidationComponent);
    return ValidationComponent;
}());
export { ValidationComponent };
//# sourceMappingURL=validation.component.js.map