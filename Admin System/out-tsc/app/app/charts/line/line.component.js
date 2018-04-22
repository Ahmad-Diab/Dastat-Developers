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
import * as shape from 'd3-shape';
import { single, multi, generateData } from '../../shared/chartData';
var LineComponent = (function () {
    function LineComponent() {
        this.range = false;
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
        // line interpolation
        this.curve = shape.curveLinear;
        this.colorScheme = {
            domain: [
                '#0099cc', '#2ECC71', '#4cc3d9', '#ffc65d', '#d96557', '#ba68c8'
            ]
        };
        this.schemeType = 'ordinal';
        this.rangeFillOpacity = 0.15;
        // line, area
        this.autoScale = true;
        this.timeline = false;
        Object.assign(this, {
            single: single,
            multi: multi
        });
        this.dateData = generateData(5, false);
        this.dateDataWithRange = generateData(2, true);
    }
    Object.defineProperty(LineComponent.prototype, "dateDataWithOrWithoutRange", {
        get: function () {
            if (this.range) {
                return this.dateDataWithRange;
            }
            else {
                return this.dateData;
            }
        },
        enumerable: true,
        configurable: true
    });
    LineComponent.prototype.select = function (data) {
        console.log('Item clicked', data);
    };
    LineComponent.prototype.onLegendLabelClick = function (entry) {
        console.log('Legend clicked', entry);
    };
    LineComponent = __decorate([
        Component({
            selector: 'app-line',
            templateUrl: './line.component.html',
            styleUrls: ['./line.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], LineComponent);
    return LineComponent;
}());
export { LineComponent };
//# sourceMappingURL=line.component.js.map