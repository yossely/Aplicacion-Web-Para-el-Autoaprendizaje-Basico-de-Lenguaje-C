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
const http_1 = require('@angular/http');
const Rx_1 = require('rxjs/Rx');
let UnitsService = class UnitsService {
    constructor(http) {
        this.http = http;
        this.unitsUrl = '/dist/content/units.json';
    }
    getUnits() {
        return this.http.get(this.unitsUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }
    getLesson(id_unit, id_lesson) {
        return this.http.get(this.unitsUrl)
            .map(response => response.json())
            .map((units) => {
            let result;
            if (units) {
                units.forEach((unit) => {
                    if (unit.id === id_unit) {
                        unit.lessons.forEach((lesson) => {
                            if (lesson.id === id_lesson) {
                                result = lesson;
                            }
                        });
                    }
                });
            }
            return result;
        })
            .catch(this.handleError);
    }
    handleError(error) {
        // Dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    }
};
UnitsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], UnitsService);
exports.UnitsService = UnitsService;

//# sourceMappingURL=../maps/units/units.service.js.map
