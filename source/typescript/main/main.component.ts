import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarMainComponent } from './navbar-main.component';


@Component({
    template: 
		`<fnd-menu></fnd-menu>
		<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, NavbarMainComponent]
})

export class MainComponent {

}