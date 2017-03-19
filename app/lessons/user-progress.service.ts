import { Injectable } from '@angular/core';

import { Progress } from '../data_structure/progress';


@Injectable()
export class UserProgressService {

    
    private _currentUnitId: number;
    private _currentLessonId: number;

    private _previousUnitId: number;
    private _previousLessonId: number;

    private _nextLessonRouterLink: string;
    private _isCurrentLessonLast: boolean;

    private _currentUserProgress: Array<Progress> = [];


    constructor(){
        
    }

    /**
     * Indicates if the current lesson is the last one or not
     * 
     * @return {boolean} true  - current lesson IS the last one
     *                   false - current lesson is NOT the last one
     */
    public isCurrentLessonLast(): boolean{
        return this._isCurrentLessonLast;
    }


    /**
     * Add new lesson to initialize the whole array that holds an user progress
     */
    public addNewLessonProgress( newLessonProgress: Progress){

        this._currentUserProgress.push(newLessonProgress);

        // console.log('and the progress is: ',this._currentUserProgress);
    }

    
    /**
     * Indicates if the progress array has been initialized
     * @return {boolean} true  - progress HAS been initialized
     *                   false - progress has NOT been initialized yet
     */
    public isProgressInitialized(): boolean{
        return (this._currentUserProgress.length > 0);
    }


    /**
     * Return current user progress array
     * @return {Progress[]} current user progress array
     */
    public getCurrentUserProgress(): Progress[]{
        return this._currentUserProgress;
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

        // console.log('curr: ',this._currentUnitId, 'and', this._currentLessonId );
        // console.log('prev: ',this._previousUnitId, 'and', this._previousLessonId );
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

        this.setNextLessonRouterLink();

        // console.log('Progress updated: ',this._currentUserProgress);
    }


    /**
     * Set the router link for the next lesson based on the current lesson
     */
    setNextLessonRouterLink(){
        var currentLessonIndex = this._currentUserProgress.findIndex( lesson => lesson.unitId == this._currentUnitId && lesson.lessonId == this._currentLessonId );

        if(currentLessonIndex == this._currentUserProgress.length-1){
            this._isCurrentLessonLast = true;
            /**
             * TODO:
             *     - Redirect the user to a new section when finishing the learning process
             */
            this._nextLessonRouterLink = 'ULTIMA-LECCION'
        }
        else{
            this._isCurrentLessonLast = false;
            this._nextLessonRouterLink = '/unit/' + this._currentUserProgress[currentLessonIndex+1].unitId 
                                        + '/lesson/' + this._currentUserProgress[currentLessonIndex+1].lessonId;
        }
        
        // console.log('next lesson url: ',this._nextLessonRouterLink);
    }


    /**
     * Set the router link for the next lesson
     * @return {string} router link for the next lesson
     */
    public getNextLessonRouterLink(): string{
        return this._nextLessonRouterLink;
    }


}