"use strict";
const home_component_1 = require('./home.component');
const units_component_1 = require('../units/units.component');
exports.homeRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'niveles', component: units_component_1.UnitsComponent }
];

//# sourceMappingURL=../maps/home/home-routes.js.map
