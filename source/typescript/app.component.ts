import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarHomeComponent } from './home/navbar-home.component';

@Component({
	selector: 'my-app',
	template: 
		`<fnd-menu></fnd-menu>
		<router-outlet></router-outlet>`,
  	directives: [ROUTER_DIRECTIVES, NavbarHomeComponent]
})

export class AppComponent {
	
}