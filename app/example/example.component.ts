import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import { Problem } from '../data_structure/problem';

@Component({
    selector: 'example-outlet',
    styleUrls: ['assets/css/example.css'],
    templateUrl: 'assets/partials/example/example.html'
})
export class ExampleComponent implements OnInit, AfterViewInit{
    
    // This is the array to manipulate and navigate to the next section: 'Example' tab
    @Input() sectionsTabs: Array<any>;

    @Input() example: Problem;
    
    exampleProblem: string;


    constructor(){}

    ngOnInit(){
        
        this.example.consoleOutput = 'Example output';
        
    }

    /**
     * Go to the next section, in this case 'Exercises'
     * Activate the 'Exercises Tab' and deactivate this tab (Example)
     */
    nextSection(){
        this.sectionsTabs[2].active = true;
        this.sectionsTabs[1].active = false;
    }

    /**
     * Lifecycle hook.
     * Angular calls this hook after it creates a component's child views
     */
    ngAfterViewInit() {
        /**
         * TODO:
         *     - Initialize code editor
         *     - Implement the step by step solution of the example problem
         */
        
        // At this point in time the DOM of your component is complete
        /*this.editor = new MyEditor("editor");
        this.editor.InitializeEditor();
        console.log('example editor ready');

        this.editor_exercise1 = new MyEditor("editor-exercise1");
        this.editor_exercise1.InitializeEditor();
        console.log('exercise-1 editor ready');    

        var btn_run_code = document.getElementById('btn-run-code');
        btn_run_code.addEventListener('click',()=>{
            console.log(this.editor.editor.getValue());
        }); */

    }

}