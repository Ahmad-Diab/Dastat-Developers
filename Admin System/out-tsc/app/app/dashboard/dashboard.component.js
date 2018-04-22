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
import { single, generateData } from '../shared/chartData';
var DashboardComponent = (function () {
    function DashboardComponent() {
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = false;
        this.tooltipDisabled = false;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = false;
        this.yAxisLabel = 'GDP Per Capita';
        this.showGridLines = true;
        this.roundDomains = false;
        this.colorScheme = {
            domain: [
                '#0099cc', '#2ECC71', '#4cc3d9', '#ffc65d', '#d96557', '#ba68c8'
            ]
        };
        this.schemeType = 'ordinal';
        // line interpolation
        this.curve = shape.curveLinear;
        // line, area
        this.timeline = false;
        // margin
        this.margin = false;
        this.marginTop = 40;
        this.marginRight = 40;
        this.marginBottom = 40;
        this.marginLeft = 40;
        // gauge
        this.gaugeMin = 0;
        this.gaugeMax = 50;
        this.gaugeLargeSegments = 10;
        this.gaugeSmallSegments = 5;
        this.gaugeTextValue = '';
        this.gaugeUnits = 'alerts';
        this.gaugeAngleSpan = 240;
        this.gaugeStartAngle = -120;
        this.gaugeShowAxis = true;
        this.gaugeValue = 50; // linear gauge value
        this.gaugePreviousValue = 70;
        Object.assign(this, {
            single: single
        });
        this.dateData = generateData(5, false);
    }
    DashboardComponent.prototype.select = function (data) {
        console.log('Item clicked', data);
    };
    DashboardComponent.prototype.onLegendLabelClick = function (entry) {
        console.log('Legend clicked', entry);
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map