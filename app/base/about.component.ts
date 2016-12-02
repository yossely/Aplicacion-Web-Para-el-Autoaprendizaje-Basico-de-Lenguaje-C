import { Component, OnInit } from '@angular/core';

@Component({
    styleUrls: ['assets/css/about.css'],
    templateUrl: 'assets/partials/about.html'
})
export class AboutComponent implements OnInit{
    
    aboutMsg: string;

    constructor(){}

    ngOnInit(){
        this.aboutMsg = 'Welcome to ABOUT page!';
    }

}