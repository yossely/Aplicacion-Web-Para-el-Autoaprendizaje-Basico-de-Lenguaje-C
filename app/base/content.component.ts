import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { UnitsService } from '../lessons/units.service';
import { Unit } from '../data_structure/unit';


import { Progress } from '../data_structure/progress';
import { UserProgressService } from '../lessons/user-progress.service';


// This component will render the content of the site, that means the units and their lessons

@Component({
    styleUrls: ['assets/css/content.css'],
    templateUrl: 'assets/partials/content.html'
})
export class ContentComponent implements OnInit, OnDestroy{
        
    unitsObs: any;
    progressObs: any;

    units: Unit[] = [];
    selectedUnit: Unit;
    isLoading: boolean = true;
    errorMsg: string = '';

    testDisplay = [];

    constructor(
        private _unitsService:UnitsService,
        private route: ActivatedRoute,
        private router: Router,
        private _userProgressService: UserProgressService
    ){}

    ngOnInit(){
        /* Initialize the tests' information to render them in the middle of the units */
        this.initializeTestDisplay();


        /**
         * Initialize current user progress only if it has not been initialized before and use it to
         * display the tests and the blocked lessons in the content page
         */
        if(!this._userProgressService.isProgressInitialized()) {

            this.progressObs = this._unitsService
                                   .getUnitIdLessonIdLessonTitle()
                                   .subscribe(
                                        progress => {
                                            this._userProgressService.addNewLessonProgress(progress);
                                        },                                // Happy path
                                        error    => console.log('Error getting units in user progress component: ',error),      // Error path
                                        ()       => {   // onComplete
                                                        this._userProgressService.blockLessonsOnInit();
                                                        this._userProgressService.updateProgress();
                                                        // After having the user progress initialized, get the content info
                                                        this.getContentInfo();
                                                    }
                                    );
        }else
            // If the user progress has already been initialized, get the content info
            this.getContentInfo();

    }

    /**
     * Set the tests' info in the testDisplay property in order to display the tests in the middle
     * of the units in the content page
     */
    initializeTestDisplay(){

        this.testDisplay = [
            {},{},{},
            {
                id: 1,
                title: 'Parcial I'
            },
            {
                id: 2,
                title: 'Parcial II'
            }
            ,
            {
                id: 3,
                title: 'Parcial III'
            }
        ];
    }

    /**
     * Get the content information from the database through the unitsService
     */
    getContentInfo(){
        this.unitsObs = this._unitsService.getAll()
                        .subscribe(
                            u     => this.initializeContent(u), // Happy path
                            error => this.errorMsg = error,     // Error path
                            ()    => this.isLoading = false     // onComplete
                        );
    }

    /**
     * Initialize Content based on the current user progress to display correctly the blocked lessons and the tests
     * 
     * @param {Unit[]} u  Units with its content to display
     */
    initializeContent(u: Unit[]){
        let _currentUserProgressSteps: Array<Progress> = this._userProgressService.getCurrentUserProgressSteps();
        
        _currentUserProgressSteps.map(step => {

            if (!step.isTest && step.isBlocked) {
                // currentStepIndex = this._currentUserProgress.findIndex( step => step.unitId == this._currentUnitId && step.lessonId == this._currentLessonId );
                u[step.unitId-1].lessons[step.lessonId-1]['isBlocked'] = true;
            }
        });
        
        this.units = u;
    }

    ngOnDestroy(){
        this.unitsObs.unsubscribe();
    }

}