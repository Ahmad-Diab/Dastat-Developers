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
import { single, multi } from '../../shared/chartData';
var BarComponent = (function () {
    function BarComponent() {
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = true;
        this.tooltipDisabled = false;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'GDP Per Capita';
        this.showGridLines = true;
        this.innerPadding = 0;
        this.barPadding = 8;
        this.groupPadding = 16;
        this.roundDomains = false;
        this.maxRadius = 10;
        this.minRadius = 3;
        this.colorScheme = {
            domain: [
                '#0099cc', '#2ECC71', '#4cc3d9'
            ]
        };
        this.schemeType = 'ordinal';
        Object.assign(this, {
            single: single,
            multi: multi
        });
    }
    BarComponent.prototype.select = function (data) {
        console.log('Item clicked', data);
    };
    BarComponent.prototype.onLegendLabelClick = function (entry) {
        console.log('Legend clicked', entry);
    };
    BarComponent = __decorate([
        Component({
            selector: 'app-bar',
            templateUrl: './bar.component.html',
            styleUrls: ['./bar.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BarComponent);
    return BarComponent;
}());
export { BarComponent };
//# sourceMappingURL=bar.component.js.map