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
var router;
var currentRoute;
// currentRoute = router.routerState.toString();
// console.log(currentRoute);
// var currentRoute:string;
currentRoute = '/home';
function getNavbarStylePath() {
    var navbar_style;
    if (currentRoute == '/home')
        navbar_style = 'assets/css/navbar_home.css';
    else if (currentRoute == '/niveles') {
        navbar_style = 'assets/css/navbar_main.css';
    }
    return navbar_style;
}
function getNavbarTemplatePath() {
    var navbar_template;
    if (currentRoute == '/home')
        navbar_template = 'assets/partials/navbar-home.html';
    else if (currentRoute == '/niveles') {
        navbar_template = 'assets/partials/navbar-main.html';
    }
    return navbar_template;
}
let NavbarComponent = class NavbarComponent {
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
    __metadata('design:paramtypes', [])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;

//# sourceMappingURL=maps/navbar.component.js.map
