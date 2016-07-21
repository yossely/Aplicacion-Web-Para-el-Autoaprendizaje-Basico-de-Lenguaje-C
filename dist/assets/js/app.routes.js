"use strict";
const router_1 = require('@angular/router');
const home_component_1 = require('./home.component');
const units_component_1 = require('./units.component');
const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'niveles', component: units_component_1.UnitsComponent }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];

//# sourceMappingURL=maps/app.routes.js.map
