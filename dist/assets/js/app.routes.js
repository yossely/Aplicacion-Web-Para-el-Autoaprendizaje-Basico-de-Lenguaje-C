"use strict";
const router_1 = require('@angular/router');
const home_routes_1 = require('./home/home-routes');
const main_routes_1 = require('./main/main-routes');
const routes = [
    ...home_routes_1.homeRoutes,
    ...main_routes_1.mainRoutes
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];

//# sourceMappingURL=maps/app.routes.js.map
