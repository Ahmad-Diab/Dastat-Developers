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
import { single, multi, bubble, generateGraph } from '../../shared/chartData';
var monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
var weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });
var MiscComponent = (function () {
    function MiscComponent() {
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
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
                '#0099cc', '#2ECC71', '#4cc3d9', '#ffc65d', '#d96557', '#ba68c8'
            ]
        };
        this.schemeType = 'ordinal';
        // line, area
        this.autoScale = true;
        this.timeline = false;
        // margin
        this.margin = false;
        this.marginTop = 40;
        this.marginRight = 40;
        this.marginBottom = 40;
        this.marginLeft = 40;
        // gauge
        this.gaugeMin = 0;
        this.gaugeMax = 100;
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
            single: single,
            multi: multi,
            graph: generateGraph(50),
            bubble: bubble
        });
        this.view = undefined;
        this.calendarData = this.getCalendarData();
    }
    MiscComponent.prototype.select = function (data) {
        console.log('Item clicked', data);
    };
    MiscComponent.prototype.onLegendLabelClick = function (entry) {
        console.log('Legend clicked', entry);
    };
    MiscComponent.prototype.getCalendarData = function () {
        // today
        var now = new Date();
        var todaysDay = now.getDate();
        var thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);
        // Monday
        var thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
        var thisMondayDay = thisMonday.getDate();
        var thisMondayYear = thisMonday.getFullYear();
        var thisMondayMonth = thisMonday.getMonth();
        // 52 weeks before monday
        var calendarData = [];
        var getDate = function (d) { return new Date(thisMondayYear, thisMondayMonth, d); };
        for (var week = -52; week <= 0; week++) {
            var mondayDay = thisMondayDay + (week * 7);
            var monday = getDate(mondayDay);
            // one week
            var series = [];
            for (var dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
                var date = getDate(mondayDay - 1 + dayOfWeek);
                // skip future dates
                if (date > now) {
                    continue;
                }
                // value
                var value = (dayOfWeek < 6) ? (date.getMonth() + 1) : 0;
                series.push({
                    date: date,
                    name: weekdayName.format(date),
                    value: value
                });
            }
            calendarData.push({
                name: monday.toString(),
                series: series
            });
        }
        return calendarData;
    };
    MiscComponent.prototype.calendarAxisTickFormatting = function (mondayString) {
        var monday = new Date(mondayString);
        var month = monday.getMonth();
        var day = monday.getDate();
        var year = monday.getFullYear();
        var lastSunday = new Date(year, month, day - 1);
        var nextSunday = new Date(year, month, day + 6);
        return (lastSunday.getMonth() !== nextSunday.getMonth()) ? monthName.format(nextSunday) : '';
    };
    MiscComponent.prototype.calendarTooltipText = function (c) {
        return "\n      <span class=\"tooltip-label\">" + c.label + " \u2022 " + c.cell.date.toLocaleDateString() + "</span>\n      <span class=\"tooltip-val\">" + c.data.toLocaleString() + "</span>\n    ";
    };
    MiscComponent = __decorate([
        Component({
            selector: 'app-misc',
            templateUrl: './misc.component.html',
            styleUrls: ['./misc.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], MiscComponent);
    return MiscComponent;
}());
export { MiscComponent };
//# sourceMappingURL=misc.component.js.map