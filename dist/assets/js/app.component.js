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
const core_1 = require('angular2/core');
let AppComponent = class AppComponent {
    constructor() {
        this.units = units_content;
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'assets/partials/nivel.html'
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
var units_content = [
    {
        'title': 'Unidad I. Donec fringilla arcu tortor, at.',
        'lesson': [
            {
                'number': 1,
                'content': 'Lorem ipsum dolor sit amet'
            },
            {
                'number': 2,
                'content': 'Donec semper nisl risus, ac. '
            },
            {
                'number': 3,
                'content': 'Sed tellus sem, vulputate ac. '
            },
        ]
    },
    {
        'title': 'Unidad II. Donec fringilla arcu tortor, at.',
        'lesson': [
            {
                'number': 1,
                'content': 'Lorem ipsum dolor sit amet'
            },
            {
                'number': 2,
                'content': 'Donec semper nisl risus, ac. '
            },
            {
                'number': 3,
                'content': 'Sed tellus sem, vulputate ac. '
            },
        ]
    }
];

//# sourceMappingURL=maps/app.component.js.map
