import { Component, Input, OnInit } from '@angular/core';

import { Problem } from '../data_structure/problem';

@Component({
    selector: 'problem-outlet',
    styleUrls: ['assets/css/problem.css'],
    templateUrl: 'assets/partials/problem/problem.html'
})
export class ProblemComponent implements OnInit{
    
    @Input() problem: Problem;
    
    @Input() isOnExercises: boolean;


    constructor(){}

    ngOnInit(){
        
    }

}