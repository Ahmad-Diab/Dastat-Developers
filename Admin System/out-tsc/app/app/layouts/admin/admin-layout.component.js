var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItems } from '../../shared/menu-items/menu-items';
import 'rxjs/add/operator/filter';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../@services/auth.service';
var SMALL_WIDTH_BREAKPOINT = 991;
var AdminLayoutComponent = (function () {
    function AdminLayoutComponent(menuItems, router, route, translate, modalService, titleService, zone, authService) {
        var _this = this;
        this.menuItems = menuItems;
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.modalService = modalService;
        this.titleService = titleService;
        this.zone = zone;
        this.authService = authService;
        this.mediaMatcher = matchMedia("(max-width: " + SMALL_WIDTH_BREAKPOINT + "px)");
        this.currentLang = 'en';
        this.theme = 'light';
        this.showSettings = false;
        this.isDocked = false;
        this.isBoxed = false;
        this.isOpened = true;
        this.mode = 'push';
        this._mode = this.mode;
        this._autoCollapseWidth = 991;
        this.width = window.innerWidth;
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        this.mediaMatcher.addListener(function (mql) { return zone.run(function () { return _this.mediaMatcher = mql; }); });
    }
    AdminLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.isOver()) {
            this._mode = 'over';
            this.isOpened = false;
        }
        this._router = this.router.events.filter(function (event) { return event instanceof NavigationEnd; }).subscribe(function (event) {
            // Scroll to top on view load
            document.querySelector('.main-content').scrollTop = 0;
            _this.runOnRouteChange();
        });
    };
    AdminLayoutComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function (_) { return _this.runOnRouteChange(); });
    };
    AdminLayoutComponent.prototype.ngOnDestroy = function () {
        this._router.unsubscribe();
    };
    AdminLayoutComponent.prototype.runOnRouteChange = function () {
        var _this = this;
        if (this.isOver() || this.router.url === '/maps/fullscreen') {
            this.isOpened = false;
        }
        this.route.children.forEach(function (route) {
            var activeRoute = route;
            while (activeRoute.firstChild) {
                activeRoute = activeRoute.firstChild;
            }
            _this.options = activeRoute.snapshot.data;
        });
        if (this.options) {
            if (this.options.hasOwnProperty('heading')) {
                this.setTitle(this.options.heading);
            }
        }
    };
    AdminLayoutComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle('Cinema App Admin System | ' + newTitle);
    };
    AdminLayoutComponent.prototype.toogleSidebar = function () {
        this.isOpened = !this.isOpened;
    };
    AdminLayoutComponent.prototype.isOver = function () {
        return window.matchMedia("(max-width: 991px)").matches;
    };
    AdminLayoutComponent.prototype.openSearch = function (search) {
        this.modalService.open(search, { windowClass: 'search', backdrop: false });
    };
    __decorate([
        ViewChild('sidebar'),
        __metadata("design:type", Object)
    ], AdminLayoutComponent.prototype, "sidebar", void 0);
    AdminLayoutComponent = __decorate([
        Component({
            selector: 'app-layout',
            templateUrl: './admin-layout.component.html',
            styleUrls: ['./admin-layout.component.scss']
        }),
        __metadata("design:paramtypes", [MenuItems,
            Router,
            ActivatedRoute,
            TranslateService,
            NgbModal,
            Title,
            NgZone,
            AuthService])
    ], AdminLayoutComponent);
    return AdminLayoutComponent;
}());
export { AdminLayoutComponent };
//# sourceMappingURL=admin-layout.component.js.map