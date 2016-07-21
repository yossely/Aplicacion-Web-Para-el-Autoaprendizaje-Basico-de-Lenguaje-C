import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({
	selector: 'my-app',
	template: 
		`<fnd-menu></fnd-menu>
		<router-outlet></router-outlet>`,
  	directives: [ROUTER_DIRECTIVES, NavbarComponent]
})

export class AppComponent {
	
}