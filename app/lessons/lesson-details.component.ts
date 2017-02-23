import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { UnitsService } from './units.service';
import { Lesson } from '../data_structure/lesson';


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
    private tempLesson: Lesson;

    // This array represents the sections tabs of the lessons and is created to be able to manipulate them in the components
    public sectionsTabs:Array<any>;

    constructor (private _unitsService: UnitsService,
                 private route: ActivatedRoute,
                 private router: Router){}

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
                lesson    => { this.tempLesson = lesson;
                                this._unitsService.getExplanationText(this.tempLesson.explanationFileName)
                                    .subscribe(
                                        explanationText => {
                                                                this.tempLesson.explanation = explanationText;
                                                                this.lesson = this.tempLesson;
                                                            },
                                        error           => console.log('Error retrieving explanation text ',error),
                                        ()              => console.log('Retrieving explanation text completed')
                                    ); 
                             },                                            // Happy path
                error     => console.log('Error retrieving lessons'),      // Error path
                ()        => console.log('Retrieving lessons completed')   // onComplete - never happening don't know why
            );
    }// ngOnInit end

    /*goToUnitsList(){
        let unitId = this.unit ? this.unit._id : null;
         
        // * Pass along the unit _id if available, so that the unitList component can highlight that unit.
        // * The optional route parameters are not separated by "?" and "&" as they would be in the URL query string. 
        // * They are separated by semicolons ";" This is matrix URL notation
         
        let link = ['/content',{id: unitId, foo: 'fooExampleIgnored'}];
        this.router.navigate(link);
    }*/

    /*saveUnitDetails(){
        console.log('saveUnitDetails called');
        this._unitsService
            .save(this.unit)
            .subscribe( (r:Response) => {
                console.log('success! unit saved');
            });
    }*/


    /**
     * On Destroy component
     */
    ngOnDestroy(){
        this.paramsSub.unsubscribe();
    }
}