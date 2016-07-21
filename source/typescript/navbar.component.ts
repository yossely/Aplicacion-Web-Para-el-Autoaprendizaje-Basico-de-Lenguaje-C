import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';

var router: Router;
var currentRoute:string;
// currentRoute = router.routerState.toString();
// console.log(currentRoute);

// var currentRoute:string;
currentRoute = '/home';

function getNavbarStylePath():string {
    var navbar_style: string;

    if( currentRoute == '/home')
        navbar_style = 'assets/css/navbar_home.css';
    else if( currentRoute == '/niveles'){
        navbar_style = 'assets/css/navbar_main.css';
    }

    return navbar_style;
}

function getNavbarTemplatePath():string {
    var navbar_template: string;

    if(currentRoute == '/home')
        navbar_template = 'assets/partials/navbar-home.html';
    else if(currentRoute == '/niveles'){
        navbar_template = 'assets/partials/navbar-main.html';
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

    ngOnInit() { }

}