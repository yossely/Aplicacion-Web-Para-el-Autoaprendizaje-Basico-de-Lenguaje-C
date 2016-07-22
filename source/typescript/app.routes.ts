import { provideRouter, RouterConfig } from '@angular/router';

import { homeRoutes }  from './home-routes';
import { mainRoutes }    from './main-routes'; 

const routes: RouterConfig = [
	...homeRoutes,
	...mainRoutes
];

export const appRouterProviders = [
	provideRouter(routes)
];