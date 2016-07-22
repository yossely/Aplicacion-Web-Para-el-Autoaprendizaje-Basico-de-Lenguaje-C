"use strict";
const router_1 = require('@angular/router');
const home_component_1 = require('./home.component');
const main_component_1 = require('./main.component');
const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'main', component: main_component_1.MainComponent }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];

//# sourceMappingURL=maps/app.home-routes.js.map
