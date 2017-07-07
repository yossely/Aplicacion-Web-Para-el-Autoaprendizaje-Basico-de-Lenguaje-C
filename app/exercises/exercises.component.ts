import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { UserProgressService } from '../lessons/user-progress.service';
import { Problem } from '../data_structure/problem';

@Component({
    selector: 'exercises-outlet',
    styleUrls: ['assets/css/exercises.css'],
    templateUrl: 'assets/partials/exercises/exercises.html'
})
export class ExercisesComponent implements OnInit, OnChanges{
    
    @Input() exercises: Array<Problem>;

    
    selectedExercise: Problem;
    selectedExerciseIndex: number;

    isSelectedExerciseLast: boolean;

    exercisesSelectorCircles: any[];

    // Indicates if this component has been initialized or not
    hasBeenInit: boolean = false;

    private isCurrentLessonLast: boolean;

    constructor(private router: Router, 
                private _userProgressService: UserProgressService){}

    ngOnInit(){

        this.exercisesSelectorCircles = [
            {
                active: true
            },
            {
                active: false
            },
            {
                active: false
            }
        ];

        // The first time init this component, the selected Exercise will be the first
        this.selectedExerciseIndex = 0;
        this.selectedExercise = this.exercises[this.selectedExerciseIndex];

        this.isSelectedExerciseLast = false;

        // Mark this component as initialized
        this.hasBeenInit = true;

        // Is current Lesson the last one?
        this.isCurrentLessonLast = this._userProgressService.isCurrentLessonLast();
    }

    selectExercise(exerciseNumber: number){
        this.selectedExerciseIndex = exerciseNumber;
        this.selectedExercise = this.exercises[exerciseNumber];

        this.activateExerciseCircle(exerciseNumber);

        if(this.selectedExerciseIndex === (this.exercises.length-1))
            this.isSelectedExerciseLast = true;
        else
            this.isSelectedExerciseLast = false;
    }

    activateExerciseCircle(activeExerciseIndex: number){
        this.exercisesSelectorCircles.forEach(function(exercise){
            exercise.active = false;
        });

        this.exercisesSelectorCircles[activeExerciseIndex].active = true;
    }
 
    nextExercise(){
        this.selectedExerciseIndex++;
        this.selectedExercise = this.exercises[this.selectedExerciseIndex];

        this.activateExerciseCircle(this.selectedExerciseIndex);

        if(this.selectedExerciseIndex === (this.exercises.length-1))
            this.isSelectedExerciseLast = true;
    }
    
    nextSection(){}

    /**
     * Navigate to the next lesson when the user clicks on 'Siguiente Leccion' button
     */
    nextLesson(){
        this.router.navigate([this._userProgressService.getNextLessonRouterLink()]);
    }

    /**
     * Angular calls its ngOnChanges method whenever it detects changes to input properties of the component (or directive)
     * 
     * param {SimpleChange} changes 
     *         Represents a basic change from a previous to a new value.
     */
    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log('exercises changed', changes);

        /**
         * Initialize console output for every exercice when lesson changed
         */
        for (var i = 0; i < this.exercises.length; i++) {
            this.exercises[i].consoleOutput = '>';
        }
        
        /**
         * If this component has already been initialized and changes, update the selected exercise
         *
         * This condition is needed because the first time this lifecycle hook is called is before the ngOnInit hook and then, 
         * the properties of this component has not been set yet.
         */
        if( this.hasBeenInit ) {
            this.selectExercise(0);
        }
    }

    ngAfterViewInit() {

        /**
         * TODO: 
         *     - Initialize tips and expected output
         */

        /*
        $(function(e:any) {
          e.preventDefault;
          
          // initialize carousel in the lower input / popover (html is inside js)  
          $('.tips-tab').popover({
            html: true,
            trigger: "click",
            placement: "top",
            content: "" +
              '<div id="tips-carousel" class="carousel slide" data-interval="true">' +
              '<!-- Indicators -->' +
                  '<div class="carousel-inner">' +
                      '<div class="item active">' +
                          '<p><img src="dist/assets/img/bulb.svg" alt="">1st Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
                      '</div>' +
                      '<div class="item">' +
                          '<p><img src="dist/assets/img/bulb.svg" alt="">2nd Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
                      '</div>' +
                      '<div class="item">' +
                          '<p><img src="dist/assets/img/bulb.svg" alt="">3rd Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
                      '</div>' +
                  '</div>' +
                  '<!-- Close x -->' +
                  '<a class="close-window-x" href="#"></a>' +
                  '<!-- Controls -->' +
                  '<a class="left carousel-control" href="#tips-carousel" data-slide="prev">' +
                      '<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>' +
                  '</a>' +
                  '<a class="right carousel-control" href="#tips-carousel" data-slide="next">' +
                      '<i class="fa fa-chevron-circle-right"></i>' +
                  '</a>' +
              '</div>' +
              '<!-- End Carousel -->'
          });

          // initialize carousel in the lower input / popover 
          $('.tips-tab').on('shown.bs.popover', function() {
            $('#tips-carousel').carousel({
              interval: 0  //this had 2000 at the beginning
            });
          });

          // close previously opened popovers by clicking outside them
          $(document).on('click', function(e:any) {
            $('a').each(function() {
              if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
              }
            });
          });  

        });
        */

    }

}