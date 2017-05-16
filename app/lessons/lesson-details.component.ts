import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { UnitsService } from './units.service';
import { Lesson } from '../data_structure/lesson';
import { UserProgressService } from './user-progress.service';


@Component({
    styleUrls: ['assets/css/lesson-details.css'],
    templateUrl: 'assets/partials/lesson.html'
})
export class LessonDetailsComponent implements OnInit, OnDestroy{

    // Subscription to the route params observable to detect the changes and update the content of this component
    paramsSub: any;

    private id_unit: number;
    private id_lesson: number;
    private lesson: Lesson;

    private isCurrentLessonLast: boolean;
    private isTestNext: boolean;
    private nextTestId: number;

    // This array represents the sections tabs of the lessons and is created to be able to manipulate them in the components
    public sectionsTabs:Array<any>;

    constructor (private _unitsService: UnitsService,
                 private route: ActivatedRoute,
                 private router: Router,
                 private _userProgressService:UserProgressService){}

    /**
     * Lifecycle hook ngOnInit. 
     * It's called when the route has been resolved and matches with this component
     * Here we can use ActivatedRoute
     */
    ngOnInit(){

        // Initialize sectionsTabs array
        this.sectionsTabs = [
                {
                    heading: 'Explicación', 
                    active: true
                },
                {
                    heading: 'Ejemplo', 
                    active: false
                },
                {
                    heading: 'Ejercicios', 
                    active: false
                }
            ];

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
                    this.id_unit = +params['id_unit'];
                    this.id_lesson = +params['id_lesson'];
                    return this._unitsService.getLesson(this.id_unit,this.id_lesson);
                })
            .subscribe(
                lesson    => this.initializeLesson(lesson),                // Happy path
                error     => console.log('Error retrieving lessons'),      // Error path
                ()        => console.log('Retrieving lessons completed')   // onComplete - never happening don't know why
            );
    }// ngOnInit end

    public selectSection(selectedTab: number){

        this.sectionsTabs.map( (tab, index) => {
            if(index == selectedTab)
                tab.active = true;
            else
                tab.active = false;
        });
    }


    /**
     * Initialize lesson with the object got from the http request
     * Create console Id for each problem (example and exercices)
     * 
     * @param {Lesson} lesson  Lesson got from the http request
     */
    initializeLesson(lesson: Lesson){
        this.lesson = lesson;

        this.lesson.example.consoleId = "console-example";

        for (var i = 0; i < this.lesson.exercises.length; i++) {
            this.lesson.exercises[i].consoleId = `console-exercise-${i+1}`;
        }

        this.selectSection(0);
        
        this.isCurrentLessonLast = this._userProgressService.isCurrentLessonLast();
        
        /* This variables are used to show the correct message 'Siguiente Lección' or 'Presentar Parcial XXX' */
        this.isTestNext = this._userProgressService.isTestNext();
        if (this.isTestNext) {
            this.nextTestId = this._userProgressService.getNextTestId();
        }

        console.log("lesson ready! ",this.lesson);
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