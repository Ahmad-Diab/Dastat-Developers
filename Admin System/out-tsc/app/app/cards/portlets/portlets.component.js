var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var PortletsComponent = (function () {
    function PortletsComponent() {
        this.curColor = 'info';
        this.isCollapsed = false;
        this.isCollapsed2 = false;
        this.isRemoved = false;
    }
    PortletsComponent.prototype.changeColor = function () {
        this.curColor = (this.curColor === 'info' ? 'warning' : 'info');
    };
    PortletsComponent = __decorate([
        Component({
            selector: 'app-portlets',
            templateUrl: './portlets.component.html',
            styleUrls: ['./portlets.component.scss']
        })
    ], PortletsComponent);
    return PortletsComponent;
}());
export { PortletsComponent };
//# sourceMappingURL=portlets.component.js.map