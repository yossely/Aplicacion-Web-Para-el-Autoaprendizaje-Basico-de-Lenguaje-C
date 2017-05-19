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

    private _isTestNext: boolean;
    private _isCurrentStepATest: boolean;
    private _isPreviousStepATest: boolean;
    private _currentTestId: number;
    private _previousTestId: number;
    private _nextTestId: number;


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
    public getCurrentUserProgressSteps(): Progress[]{
        return this._currentUserProgress;
    }


    /**
     * Get Lessons of the current user progress (without the tests on it)
     * 
     * @return {Progress[]} 
     */
    public getOnlyLessonsCurrentUserProgress(): Progress[]{
        
        var onlyLessons:Progress[] = this._currentUserProgress.filter(step => {
            return step.isTest == false;
        });
        return onlyLessons;
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

        /* Update the variables _isCurrentStepATest and _isPreviousStepATest */
        if (this._isCurrentStepATest) {
            this._isCurrentStepATest = false;
            this._isPreviousStepATest = true;
        }else{
            this._isPreviousStepATest = false;
        }
        
        // console.log('curr: ',this._currentUnitId, 'and', this._currentLessonId );
        // console.log('prev: ',this._previousUnitId, 'and', this._previousLessonId );
    }

    /**
     * Update the new Test Id and save the previous step (which was a lesson)
     * @param {number} newTestId new test id
     */
    updateTestId(newTestId: number){
        /* current lesson and unit Id will be 0 and the previous ones are updated */
        this._previousUnitId = this._currentUnitId;
        this._previousLessonId = this._currentLessonId;

        this._currentUnitId = 0;
        this._currentLessonId = 0;

        /* previous test id updated and current test id is the new param received from the user-progress.component */
        this._previousTestId = this._currentTestId;
        this._currentTestId = newTestId;
        
        /* If the user comes from another test, then mark _isPreviousStepATest as true */
        if (this._isCurrentStepATest)
            this._isPreviousStepATest = true;

        this._isCurrentStepATest = true;
    }


    /**
     * Update current user's progress based on the new step and the previous step
     */
    updateProgress(){

        console.log('this._previousUnitId: ',this._previousUnitId);
        console.log('this._previousLessonId: ',this._previousLessonId);
        console.log('this._currentUnitId: ',this._currentUnitId);
        console.log('this._currentLessonId: ',this._currentLessonId);
        console.log('this._currentTestId: ',this._currentTestId);
        
        /* This means that the user is currently on a test */
        if (this._currentUnitId==0 && this._currentLessonId==0) {
            /**
             * Mark current test as CURRENT to update class that show the 'ARROW' in the circles progress
             */
            this._currentUserProgress.filter( step => (step.testId == this._currentTestId))
                                     .map( newStep => {
                                         newStep.isCurrent = true;
                                         return newStep;
                                     });
            console.log('_isPreviousStepATest: ',this._isPreviousStepATest);
            
            this.updatePreviousStepStatus();
        }else{
            /**
             * Mark new lesson as CURRENT to update class that show the 'ARROW' in the circles progress
             */
            this._currentUserProgress.filter( lesson => (lesson.unitId == this._currentUnitId && lesson.lessonId == this._currentLessonId))
                                     .map( newLesson => {
                                         newLesson.isCurrent = true;
                                         return newLesson;
                                     });

            this.updatePreviousStepStatus();
        }

        this.setNextStepRouterLink();

        // console.log('Progress updated: ',this._currentUserProgress);
    }

    /**
     * Update previous step status based on its type (lesson or test)
     *
     * The status are 'isCurrent' and 'isCompleted'
     */
    updatePreviousStepStatus(){
        if (this._isPreviousStepATest) {
            /**
             * Mark previous test as COMPLETED to update class that show the 'CHECKED' in the circles progress
             */
            if(this._previousTestId){
                this._currentUserProgress.filter( step => (step.testId == this._previousTestId))
                .map( previousStep => {
                    previousStep.isCurrent = false;
                    previousStep.isCompleted = true;
                    return previousStep;
                });
            }
        }else{
            /**
             * Mark previous lesson as COMPLETED to update class that show the 'CHECKED' in the circles progress
             */
            if (this._previousLessonId) {
                this._currentUserProgress.filter( lesson => (lesson.unitId == this._previousUnitId && lesson.lessonId == this._previousLessonId))
                .map( previousLesson => {
                    previousLesson.isCurrent = false;
                    previousLesson.isCompleted = true;
                    return previousLesson;
                });
            }
        }
    }


    /**
     * Set the router link for the next lesson based on the current lesson
     */
    setNextStepRouterLink(){
        var currentLessonIndex = this._currentUserProgress.findIndex( lesson => lesson.unitId == this._currentUnitId && lesson.lessonId == this._currentLessonId );

        /* Indicate if a test comes after the current lesson and set the correct router link for it */
        if (this._currentUserProgress[currentLessonIndex+1].isTest) {
            this._isTestNext = true;
            this._nextTestId = this._currentUserProgress[currentLessonIndex+1].testId;
            this._nextLessonRouterLink = '/test/' + this._nextTestId;
        }
        else{
            this._isTestNext = false;   
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
        }

        console.log('_currentUserProgress: ',this._currentUserProgress, ' currentLessonIndex ',currentLessonIndex);
        /* Check if the user is on a test */
        /*if (this._currentUserProgress[currentLessonIndex].isTest)
            this._isCurrentStepATest = true;*/
        
        console.log('next lesson url: ',this._nextLessonRouterLink);
    }

    isOnTest(){
        return this._isCurrentStepATest;
    }

    getNextTestId(){
        return this._nextTestId;
    }

    /**
     * Set the router link for the next lesson
     * @return {string} router link for the next lesson
     */
    public getNextLessonRouterLink(): string{
        return this._nextLessonRouterLink;
    }


    /**
     * Initialize the blocked lessons and where are the test located
     */
    public blockLessonsOnInit(){
        /* Block Lessons from 11 to 18 */
        for (var i = 10; i < this._currentUserProgress.length; i++)
            this._currentUserProgress[i].isBlocked = true;

        /* Insert tests in the progress flow */
        var test = <Progress>({
                            isTest: true,
                            testId: 1,
                            testTitle: 'Parcial I'
                        })
        this._currentUserProgress.splice(10, 0, test); // After Lesson 10

        test = <Progress>({
                            isTest: true,
                            testId: 2,
                            testTitle: 'Parcial II'
                        })
        this._currentUserProgress.splice(15, 0, test); // After Lesson 14 (+1 'cause of the test added before)

        test = <Progress>({
                            isTest: true,
                            testId: 3,
                            testTitle: 'Parcial III'
                        })
        this._currentUserProgress.splice(20, 0, test); // After Lesson 18 (+2 'cause of the tests added before)

        // console.log('user progress with tests: ',this._currentUserProgress);
    }


    /**
     * Indicates if a test comes next to the current lesson
     * 
     * @return {boolean} true  - Test does come next current lesson
     *                   false - Test does NOT come next current lesson
     */
    public isTestNext(): boolean{
        return this._isTestNext;
    }

    /**
     * Get the current test id
     *
     * Useful when try to update the score of a test
     */
    public getCurrentTestId(): number{
        return this._currentTestId;
    }

}