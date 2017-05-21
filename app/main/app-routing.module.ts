import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Route config let's you map routes to components
 * The order of the routes in the configuration matters (first-match wins)
 */
const appRoutes: Routes = [
    // map '/' to '/home' as our default route
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    // map '**' to pageNotFoundComponent (TODO: create and handle a 404 exception!)
    /*{
        path: '**',
        component: pageNotFoundComponent
    },*/
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class appRoutingModule {}

// export const routing = RouterModule.forRoot(routes);