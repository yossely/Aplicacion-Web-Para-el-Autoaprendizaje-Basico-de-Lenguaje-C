import { Component, Input, OnInit } from '@angular/core';


@Component({
    /*styleUrls: ['assets/css/about.css'],
    templateUrl: 'assets/partials/about.html'*/
    selector: 'explanation-content',
    templateUrl: 'assets/partials/explanation/explanation-content.html'
})
export class ExplanationContentComponent implements OnInit{
    
    @Input() explanation: string;

    constructor(){}

    ngOnInit(){
        // this.explanation = 'I modify what you have daddy';
        // this.expMsg = 'Im from the explanation component!';
    }

}