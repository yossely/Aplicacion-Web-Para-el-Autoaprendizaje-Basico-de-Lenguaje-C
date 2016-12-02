import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'problem-outlet',
    styleUrls: ['assets/css/problem.css'],
    templateUrl: 'assets/partials/problem/problem.html'
})
export class ProblemComponent implements OnInit{
    
    @Input() problem: string;
    @Input() isOnExercises: boolean;


    constructor(){}

    ngOnInit(){
        
        // this.problem = 'Im the problem dude';
        
    }

}