import { Component, OnInit } from '@angular/core';

// This component will render two sections: NavbarBase and router-outlet

@Component({
    template: `
        <navbar-menu></navbar-menu>
        <router-outlet></router-outlet>
    `
})

export class BaseComponent implements OnInit{
    
    constructor(){}

    ngOnInit(){}

}