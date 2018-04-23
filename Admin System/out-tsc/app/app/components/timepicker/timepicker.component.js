var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
var TimepickerComponent = (function () {
    function TimepickerComponent() {
        this.meridian = true;
        this.time = { hour: 13, minute: 30, second: 30 };
        this.seconds = true;
        this.spinners = true;
        this.hourStep = 1;
        this.minuteStep = 15;
        this.secondStep = 30;
        this.ctrl = new FormControl('', function (control) {
            var value = control.value;
            if (!value) {
                return null;
            }
            if (value.hour < 12) {
                return { tooEarly: true };
            }
            if (value.hour > 13) {
                return { tooLate: true };
            }
            return null;
        });
    }
    TimepickerComponent.prototype.toggleMeridian = function () {
        this.meridian = !this.meridian;
    };
    TimepickerComponent.prototype.toggleSeconds = function () {
        this.seconds = !this.seconds;
    };
    TimepickerComponent.prototype.toggleSpinners = function () {
        this.spinners = !this.spinners;
    };
    TimepickerComponent = __decorate([
        Component({
            selector: 'app-timepicker',
            templateUrl: './timepicker.component.html',
            styleUrls: ['./timepicker.component.scss']
        })
    ], TimepickerComponent);
    return TimepickerComponent;
}());
export { TimepickerComponent };
//# sourceMappingURL=timepicker.component.js.map