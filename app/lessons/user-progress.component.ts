import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Unit } from '../data_structure/unit';
import { Progress } from '../data_structure/progress';
import { UnitsService } from './units.service';
import { UserProgressService } from './user-progress.service';

@Component({
    selector: 'user-progress',
    styleUrls: ['assets/css/navbar_lessons.css'],
    templateUrl: 'assets/partials/user-progress.html' 
})
export class UserProgressComponent implements OnInit, OnDestroy{

    progressObs: any;

    /**
     * Array to hold the current user progress' lessons (got from the service)
     *
     * Calling _userProgressService.getCurrentUserProgressSteps() from the template causes an infinite loop 
     * inside the ngFor.
     *
     * 
     * This is just Angular2 change detection at work calling getCurrentUserProgressSteps() over and over in each change 
     * detection cycle.
     * Calling methods from the template is discouraged because they are called very often. You should instead store 
     * the result in a property and bind to this property instead.
     *
     * @ref http://stackoverflow.com/a/37876564/5932537
     * 
     * @type {Array<Progress>}
     */
    private _currentUserProgressSteps: Array<Progress> = [];

    constructor(
        private _unitsService:UnitsService,
        private route: ActivatedRoute,
        private router: Router,
        private _userProgressService:UserProgressService){}

    ngOnInit(){
        this.route.params.subscribe( params => {

            // console.log('params: ',params);

            if (params['id_unit'])
                this._userProgressService.updateUnitLessonIds(+params['id_unit'], +params['id_lesson']);
            else if(params['id_test'])
                this._userProgressService.updateTestId(+params['id_test']);


            /**
             * If the progress array has already been initialized, update the progress 
             */
            if(this._userProgressService.isProgressInitialized()){
                this._userProgressService.updateProgress();
                this._currentUserProgressSteps = this._userProgressService.getCurrentUserProgressSteps();
            }

        });

        /**
         * Prevent initializing again the user progress if the user leaves the lesson component and back 
         * again in the same 'session' (without reloading the page)
         */
        if(!this._userProgressService.isProgressInitialized()) {

            this.progressObs = this._unitsService
                                   .getUnitIdLessonIdLessonTitle()
                                   .subscribe(
                                        progress => {
                                            this._userProgressService.addNewLessonProgress(progress);
                                            this._currentUserProgressSteps = this._userProgressService.getCurrentUserProgressSteps();
                                        },                                // Happy path
                                        error    => console.log('Error getting units in user progress component: ',error),      // Error path
                                        ()       => {   // onComplete
                                                        this._userProgressService.blockLessonsOnInit();
                                                        this._userProgressService.updateProgress();
                                                        this._currentUserProgressSteps = this._userProgressService.getCurrentUserProgressSteps();
                                                    }
                                    );
        }
    }

    ngOnDestroy(){
        /**
         * As I prevent loading again the user progress if the user leaves the lessons section and get back in the same
         * session, I can not unsubscribe again an observable already gone.
         *
         * The examplo flow is: home -> lessons -> home (here this onDestroy is called) -> lessons -> home (onDestroy
         *                      tries to unsubscribe progressObs which is not subscribed again because of my condition
         *                      inside ngOnInit )
         */
        // this.progressObs.unsubscribe();
    }    

}