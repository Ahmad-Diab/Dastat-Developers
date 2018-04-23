var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
var RatingComponent = (function () {
    function RatingComponent() {
        this.currentRate = 8;
        this.selected = 0;
        this.hovered = 0;
        this.readonly = false;
        this.decimalCurrentRate = 3.14;
        this.ctrl = new FormControl(null, Validators.required);
    }
    RatingComponent.prototype.toggle = function () {
        if (this.ctrl.disabled) {
            this.ctrl.enable();
        }
        else {
            this.ctrl.disable();
        }
    };
    RatingComponent = __decorate([
        Component({
            selector: 'app-rating',
            templateUrl: './rating.component.html',
            styleUrls: ['./rating.component.scss']
        })
    ], RatingComponent);
    return RatingComponent;
}());
export { RatingComponent };
//# sourceMappingURL=rating.component.js.map