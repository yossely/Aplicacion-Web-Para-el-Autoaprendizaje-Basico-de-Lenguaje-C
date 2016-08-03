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
const units_service_1 = require('./units.service');
let UnitsComponent = class UnitsComponent {
    constructor(unitsService) {
        this.unitsService = unitsService;
    }
    ngOnInit() {
        this.unitsService.getUnits()
            .subscribe(result => {
            this.units = result;
            console.log('Units ready ');
            console.log(this.units);
        });
    }
};
UnitsComponent = __decorate([
    core_1.Component({
        styleUrls: ['dist/assets/css/niveles.css'],
        templateUrl: 'dist/assets/partials/nivel.html',
        providers: [units_service_1.UnitsService],
        directives: [router_1.ROUTER_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [units_service_1.UnitsService])
], UnitsComponent);
exports.UnitsComponent = UnitsComponent;

//# sourceMappingURL=../maps/units/units.component.js.map
