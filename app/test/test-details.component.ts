import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';


import { Test } from '../data_structure/test';
import { TestsService } from '../test/tests.service';
import { UserProgressService } from '../lessons/user-progress.service';
import { UserTestsInfoService } from './user-tests-info.service'

import { ProgressbarModule } from 'ng2-bootstrap/ng2-bootstrap';

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

    /* Variables to hold, show in template and update the current test score */
    private _currentTestScore: number;
    private _scoreChangeSubscription: any;

    /* Progress Bar on Test */
    private _maxScore:number = 100;
    private _typeProgressBar:string;

    
    constructor(private route: ActivatedRoute,
                private router: Router,
                private _testsService:TestsService,
                private _userProgressService:UserProgressService,
                private _userTestsInfoService: UserTestsInfoService){}

    ngOnInit(){

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

        // Set the current test's score to the initialized by the _userTestsInfoService 
        this._currentTestScore = this._userTestsInfoService.getTestScore(this._currentTest.id);
        this.updateProgressBar();
        // Subscribe to the changes of the score hold in the _userTestsInfoService
        this._scoreChangeSubscription = this._userTestsInfoService.scoreChange.subscribe((newScore) => { 
            this._currentTestScore = newScore; 
            this.updateProgressBar();
        });

        // console.log("test ready! ",this._currentTest);
    }


    /**
     * Update color and value of the Progress Bar when the test's socore is updated
     */
    updateProgressBar(){
        // console.log('UPDATE PROGRESS BAR: _currentTestScore in test-details',this._currentTestScore);

        if (this._currentTestScore <= 35)
          this._typeProgressBar = 'warning';
        else if (this._currentTestScore <= 65)
          this._typeProgressBar = 'info';
        else
          this._typeProgressBar = 'success';

        /* Unlock forward lessons if the user gets 65 points or more in the current test score */
        if (this._currentTestScore >= 65)
            this._userProgressService.unlockForwardLessons();
        
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
        // Unsubscribe to the changes of the current test score
        if(this._scoreChangeSubscription)
            this._scoreChangeSubscription.unsubscribe();
    }

}