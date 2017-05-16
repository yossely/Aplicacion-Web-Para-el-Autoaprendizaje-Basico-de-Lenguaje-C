import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <navbar-menu></navbar-menu>
        <router-outlet></router-outlet>
    `
})
export class TestComponent implements OnInit{

    constructor(){}

    ngOnInit(){}

}