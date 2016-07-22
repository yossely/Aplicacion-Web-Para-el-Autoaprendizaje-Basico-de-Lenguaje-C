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
let MainComponent = class MainComponent {
};
MainComponent = __decorate([
    core_1.Component({
        styleUrls: ['dist/assets/css/styles.css'],
        templateUrl: 'dist/assets/partials/main.html',
        // template: '<h1>Ich bin Main</h1>',
        directives: [router_1.ROUTER_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], MainComponent);
exports.MainComponent = MainComponent;

//# sourceMappingURL=maps/main.component.js.map
