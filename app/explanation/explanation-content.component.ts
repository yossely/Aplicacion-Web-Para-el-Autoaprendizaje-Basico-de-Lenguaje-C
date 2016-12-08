import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { Explanation } from '../data_structure/explanation';


@Component({
    /*styleUrls: ['assets/css/about.css'],
    templateUrl: 'assets/partials/about.html'*/
    selector: 'explanation-content',
    templateUrl: 'assets/partials/explanation/explanation-content.html'
})
export class ExplanationContentComponent implements OnInit, OnChanges{
    
    @Input() explanation: Explanation;

    constructor(){}

    ngOnInit(){
        // this.explanation = 'I modify what you have daddy';
        // this.expMsg = 'Im from the explanation component!';
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        /*console.log('explanation CONTENT changed', changes);

        for (let propName in changes) {
            let changedProp = changes[propName];
            let from = JSON.stringify(changedProp.previousValue);
            let to =   JSON.stringify(changedProp.currentValue);
            let fc =   JSON.stringify(changedProp.isFirstChange());
            console.log(`${propName} changed from ${from} to ${to}. is it? ${fc}`);
        }*/
    }

}