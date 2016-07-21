import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent }  from './home.component';
import { UnitsComponent }    from './units.component';

const routes: RouterConfig = [
	{ path: '', redirectTo: '/home', pathMatch: 'full'	},
	{ path: 'home', component: HomeComponent },
	{ path: 'niveles', component: UnitsComponent }
];

export const appRouterProviders = [
	provideRouter(routes)
];