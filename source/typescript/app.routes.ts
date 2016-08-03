import { provideRouter, RouterConfig } from '@angular/router';

import { homeRoutes }  from './home/home-routes';
import { mainRoutes }    from './main/main-routes'; 

const routes: RouterConfig = [
	...homeRoutes,
	...mainRoutes
];

export const appRouterProviders = [
	provideRouter(routes)
];