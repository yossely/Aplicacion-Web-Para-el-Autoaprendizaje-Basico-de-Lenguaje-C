import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
// import { NavbarComponent } from './navbar.component';

@Component({
	selector: 'my-app',
	template: 
		`<h1>AprendaC</h1>
		    <nav>
				<a routerLink="/home" routerLinkActive="active">Home</a>
				<a routerLink="/niveles" routerLinkActive="active">Niveles</a>
				<a routerLink="/main" routerLinkActive="active">Main</a>
			</nav>
		<!-- <fnd-menu></fnd-menu> -->
		<router-outlet></router-outlet>`,
  	directives: [ROUTER_DIRECTIVES/*, NavbarComponent*/]
})

export class AppComponent {
	
}