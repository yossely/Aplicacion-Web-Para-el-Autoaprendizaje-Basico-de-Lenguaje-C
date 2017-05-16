import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';


import { Test } from '../data_structure/test';
import { TestsService } from '../test/tests.service';
import { UserProgressService } from '../lessons/user-progress.service';


@Component({
    styleUrls: ['assets/css/lesson-details.css','assets/css/exercises.css', 'assets/css/test.css'],
    templateUrl: 'assets/partials/test.html'
})
export class TestDetailsComponent implements OnInit{

    // Subscription to the route params observable to detect the changes and update the content of this component
    paramsSub: any;


    private _currentTest: Test;

    private isCurrentLessonLast: boolean;
    private isTestNext: boolean;
    private nextTestId: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private _testsService:TestsService,
                private _userProgressService:UserProgressService){}

    ngOnInit(){

        /*this._currentTest.problems.push(<Problem>({
            statement: 'enunciado 1',
            code: '#include <stdio.h>',
            consoleId: 'console-problem-1',
            consoleOutput: '>',
            expectedOutput: '>Hola mundo 1'
        }),
        <Problem>({
            statement: 'enunciado 2',
            code: '#include <string.h>',
            consoleId: 'console-problem-3',
            consoleOutput: '>',
            expectedOutput: '>Hola mundo 2'
        }),
        <Problem>({
            statement: 'enunciado 3',
            code: '#include <conio.h>',
            consoleId: 'console-problem-3',
            consoleOutput: '>',
            expectedOutput: '>Hola mundo 3'
        }));*/

        /**
         * General Notes:
         *     - (+) converts string 'id' to a number
         *     - This is the observable params approach. Stick with it if there's even a chance that we might 
         *     navigate to this component multiple times in a row. (we retrieve the route params from an Observable. 
         *     That implies that the route params can change during the lifetime of this component) Eg. Changing the 
         *     lesson view is going to be faster because we'll reuse the same component instance, just change the data 
         *     inside of it.
         */

        this.paramsSub = this.route.params
            .switchMap((params: Params) => {
                    return this._testsService.getTestById(+params['id_test']);
                })
            .subscribe(
                test    => this.initializeTest(test),                // Happy path
                error     => console.log('Error retrieving tests'),      // Error path
                ()        => console.log('Retrieving tests completed')   // onComplete - never happening don't know why
            );
    }

    /**
     * Initialize test with the object got from the http request
     * Create console Id for each problem
     * 
     * @param {Test} test  Test got from the http request
     */
    initializeTest(test: Test){
        this._currentTest = test;

        for (var i = 0; i < this._currentTest.problems.length; i++) {
            this._currentTest.problems[i].consoleId = `console-test-problem-${i+1}`;
        }
        
        this.isCurrentLessonLast = this._userProgressService.isCurrentLessonLast();
        this.isTestNext = this._userProgressService.isTestNext();
        if (this.isTestNext) {
            this.nextTestId = this._userProgressService.getNextTestId();
        }

        console.log("test ready! ",this._currentTest);
    }


    /**
     * Navigate to the next lesson when the user clicks on 'Siguiente Leccion' button
     */
    nextLesson(){
        this.router.navigate([this._userProgressService.getNextLessonRouterLink()]);
    }


    /**
     * On Destroy component
     */
    ngOnDestroy(){
        this.paramsSub.unsubscribe();
    }

}