import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Location } from '@angular/common';

var currentRoute:string;
currentRoute = '/home';

function getNavbarStylePath():string {
    var navbar_style: string;

    if( currentRoute == '/home')
        navbar_style = 'dist/assets/css/navbar_home.css';
    else if( currentRoute == '/niveles'){
        navbar_style = 'dist/assets/css/navbar_main.css';
    }

    return navbar_style;
}

function getNavbarTemplatePath():string {
    var navbar_template: string;

    if(currentRoute == '/home')
        navbar_template = 'dist/assets/partials/navbar-home.html';
    else if(currentRoute == '/niveles'){
        navbar_template = 'dist/assets/partials/navbar-main.html';
    }

    return navbar_template;
}

@Component({
    selector: 'fnd-menu',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [getNavbarStylePath()],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: getNavbarTemplatePath()
})
export class NavbarComponent implements OnInit {
    public showMenu : boolean;
    public query : boolean;
    public router : Router;

    constructor(location:Location) {
      this.query = false;
      // router.changes.subscribe(() => {
      //   console.log(this.location.path());
      // });
      console.log("hello");
      console.log(location.path());
      // console.log(router.routerState.snapshot.url);

    }

    showNavbarMain(){
        this.query = !this.query;
    }

    routeIsActive(routePath: string) {

        return this.router.url == routePath;
    }

    ngOnInit() { }

}