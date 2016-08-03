import { RouterConfig }  from '@angular/router';
import { HomeComponent } from './home.component';
import { UnitsComponent }   from '../units/units.component';

export const homeRoutes: RouterConfig = [
	{ path: '', redirectTo: '/home', pathMatch: 'full'	},
	{ path: 'home', component: HomeComponent },
	{ path: 'niveles', component: UnitsComponent }
];