import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BaseComponent }  from './base.component';
import { HomeComponent }    from './home.component';
import { HowItWorksComponent }    from './howitworks.component';
import { ContentComponent }    from './content.component';


const baseRoutes: Routes = [
    { 
        path: '', 
        component: BaseComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent  
            },
            {
                path: 'howitworks',
                component: HowItWorksComponent  
            },
            {
                path: 'content',
                component: ContentComponent  
            }
        ] 
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(baseRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BaseRoutingModule { }