import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'example-outlet',
    styleUrls: ['assets/css/example.css'],
    templateUrl: 'assets/partials/example/example.html'
})
export class ExampleComponent implements OnInit{
    
    // This is the array to manipulate and navigate to the next section: 'Example' tab
    @Input() sectionsTabs: Array<any>;

    exampleProblem: string;


    constructor(){}

    ngOnInit(){
        
        this.exampleProblem = 'Im the example problem baby';
        
    }

    /**
     * Go to the next section, in this case 'Exercises'
     * Activate the 'Exercises Tab' and deactivate this tab (Example)
     */
    nextSection(){
        this.sectionsTabs[2].active = true;
        this.sectionsTabs[1].active = false;
    }

}