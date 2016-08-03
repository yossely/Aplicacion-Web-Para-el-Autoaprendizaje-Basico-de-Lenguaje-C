import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'fnd-menu',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['dist/assets/css/navbar_home.css'],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'dist/assets/partials/navbar-home.html'
})

export class NavbarHomeComponent {

}