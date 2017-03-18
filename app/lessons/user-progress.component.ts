import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Unit } from '../data_structure/unit';
import { Progress } from '../data_structure/progress';
import { UnitsService } from './units.service';

@Component({
    selector: 'user-progress',
    styleUrls: ['assets/css/navbar_lessons.css'],
    templateUrl: 'assets/partials/user-progress.html' 
})
export class UserProgressComponent implements OnInit{

    progressObs: Observable<Progress>;

    private _currentUserProgress: Array<Progress> = [];

    private _currentUnitId: number;
    private _currentLessonId: number;

    private _previousUnitId: number;
    private _previousLessonId: number;

    constructor(
        private _unitsService:UnitsService,
        private route: ActivatedRoute,
        private router: Router){}

    ngOnInit(){

        this.route.params.subscribe( params => {

            this.updateUnitLessonIds(+params['id_unit'], +params['id_lesson']);

            /**
             * If the progress array has already been initialized, update the progress 
             */
            if(this._currentUserProgress.length > 0)
                this.updateProgress();

        });

        this.progressObs = this._unitsService.getUnitIdLessonIdLessonTitle();

        this.progressObs.subscribe(
            progress => {
                this._currentUserProgress.push(progress); 
                console.log('obs data',this._currentUserProgress);
            },                                // Happy path
            error    => console.log('Error getting units in user progress component: ',error),      // Error path
            ()       => this.updateProgress()   // onComplete
        );
    }


    /**
     * Update the new Lesson and Unit id and save the previous ones
     * @param {number} newUnitId   new unit id
     * @param {number} newLessonId new lesson id
     */
    updateUnitLessonIds(newUnitId: number, newLessonId: number){
        this._previousUnitId = this._currentUnitId;
        this._previousLessonId = this._currentLessonId;

        this._currentUnitId = newUnitId;
        this._currentLessonId = newLessonId;
    }

    /**
     * Update current user's progress based on the new lesson and the previous lesson
     */
    updateProgress(){
        
        /**
         * Mark new lesson as CURRENT to update class that show the 'ARROW' in the circles progress
         */
        this._currentUserProgress.filter( lesson => (lesson.unitId == this._currentUnitId && lesson.lessonId == this._currentLessonId))
                                 .map( newLesson => {
                                     newLesson.isCurrent = true;
                                     return newLesson;
                                 });

        /**
         * Mark previous lesson as COMPLETED to update class that show the 'CHECKED' in the circles progress
         */
        if(this._previousLessonId){
            this._currentUserProgress.filter( lesson => (lesson.unitId == this._previousUnitId && lesson.lessonId == this._previousLessonId))
            .map( previousLesson => {
                previousLesson.isCurrent = false;
                previousLesson.isCompleted = true;
                return previousLesson;
            });
        }

        // console.log('Progress updated: ',this._currentUserProgress);
    }

}