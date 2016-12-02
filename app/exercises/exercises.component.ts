import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'exercises-outlet',
    styleUrls: ['assets/css/exercises.css'],
    templateUrl: 'assets/partials/exercises/exercises.html'
})
export class ExercisesComponent implements OnInit{
    
    allExercices: string[];
    
    selectedExercise: string;
    selectedExerciseIndex: number;

    isSelectedExerciseLast: boolean;

    exercises: any[];


    constructor(){}

    ngOnInit(){

        this.exercises = [
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
        
        this.allExercices = ['Exercise Eins', 'Exercise Zwei', 'Exercise Drei'];
        
        // The first time init this componenet, the selected Exercise will be the first
        this.selectedExerciseIndex = 0;
        this.selectedExercise = this.allExercices[this.selectedExerciseIndex];

        this.isSelectedExerciseLast = false;

    }

    selectExercise(exerciseNumber: number){
        this.selectedExerciseIndex = exerciseNumber;
        this.selectedExercise = this.allExercices[exerciseNumber];

        this.activateExerciseCircle(exerciseNumber);

        if(this.selectedExerciseIndex === (this.allExercices.length-1))
            this.isSelectedExerciseLast = true;
        else
            this.isSelectedExerciseLast = false;
    }

    activateExerciseCircle(activeExerciseIndex: number){
        this.exercises.forEach(function(exercise){
            exercise.active = false;
        });

        this.exercises[activeExerciseIndex].active = true;
    }
 
    nextExercise(){
        this.selectedExerciseIndex++;
        this.selectedExercise = this.allExercices[this.selectedExerciseIndex];

        this.activateExerciseCircle(this.selectedExerciseIndex);

        if(this.selectedExerciseIndex === (this.allExercices.length-1))
            this.isSelectedExerciseLast = true;
    }
    
    nextSection(){}

}