import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarMainComponent } from './navbar-main.component';


@Component({
	// styleUrls: ['dist/assets/css/styles.css'],
    // templateUrl: 'dist/assets/partials/main.html',
    template: 
		`<h1>I'm main</h1>
		<fnd-menu></fnd-menu>
		<a routerLink="/main/2">2</a>
		<a routerLink="/main">null</a>
		<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, NavbarMainComponent]
})

export class MainComponent {

}