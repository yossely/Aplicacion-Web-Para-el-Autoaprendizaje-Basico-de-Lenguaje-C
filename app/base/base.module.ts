import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

/**
 * Note: There can be only one owner for a declared component.
 */

// Render two sections: NavbarBase and router-outlet
import { BaseComponent }    from './base.component';

import { NavbarBaseComponent } from './navbar-base.component';
import { HomeComponent }    from './home.component';
import { AboutComponent }  from './about.component';
import { ContentComponent }  from './content.component';

/**
 * Note: Routes provided by feature modules (BaseRoutingModule) will be combined together into their imported module's routes 
 * (AppModule) by the router. This allows us to continue defining our feature module routes without modifying our main route 
 * configuration.
 */
// Handle the routes of the basic views in the application (Home, Content, About)
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule,
        BaseRoutingModule
    ],
    declarations: [
        BaseComponent,
        NavbarBaseComponent,
        HomeComponent,
        AboutComponent,
        ContentComponent
    ]
})
export class BaseModule {}