import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'fnd-menu',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['dist/assets/css/navbar_main.css'],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'dist/assets/partials/navbar-main.html'
})

export class NavbarMainComponent {

}