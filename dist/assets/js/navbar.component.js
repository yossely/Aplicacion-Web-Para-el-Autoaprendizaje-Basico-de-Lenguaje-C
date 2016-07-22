"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const common_1 = require('@angular/common');
var currentRoute;
currentRoute = '/home';
function getNavbarStylePath() {
    var navbar_style;
    if (currentRoute == '/home')
        navbar_style = 'dist/assets/css/navbar_home.css';
    else if (currentRoute == '/niveles') {
        navbar_style = 'dist/assets/css/navbar_main.css';
    }
    return navbar_style;
}
function getNavbarTemplatePath() {
    var navbar_template;
    if (currentRoute == '/home')
        navbar_template = 'dist/assets/partials/navbar-home.html';
    else if (currentRoute == '/niveles') {
        navbar_template = 'dist/assets/partials/navbar-main.html';
    }
    return navbar_template;
}
let NavbarComponent = class NavbarComponent {
    constructor(location) {
        this.query = false;
        // router.changes.subscribe(() => {
        //   console.log(this.location.path());
        // });
        console.log("hello");
        console.log(location.path());
        // console.log(router.routerState.snapshot.url);
    }
    showNavbarMain() {
        this.query = !this.query;
    }
    routeIsActive(routePath) {
        return this.router.url == routePath;
    }
    ngOnInit() { }
};
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'fnd-menu',
        encapsulation: core_1.ViewEncapsulation.None,
        styleUrls: [getNavbarStylePath()],
        directives: [router_1.ROUTER_DIRECTIVES],
        templateUrl: getNavbarTemplatePath()
    }), 
    __metadata('design:paramtypes', [common_1.Location])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;

//# sourceMappingURL=maps/navbar.component.js.map
