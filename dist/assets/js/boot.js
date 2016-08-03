"use strict";
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
const app_component_1 = require('./app.component');
const app_routes_1 = require('./app.routes');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [app_routes_1.appRouterProviders, http_1.HTTP_PROVIDERS])
    .catch(err => console.log(err));

//# sourceMappingURL=maps/boot.js.map
