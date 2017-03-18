import { Component, OnInit } from '@angular/core';
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
export class UserProgressComponent implements OnInit{

    progressObs: Observable<Progress>;

    constructor(
        private _unitsService:UnitsService,
        private route: ActivatedRoute,
        private router: Router,
        private _userProgressService:UserProgressService){}

    ngOnInit(){

        this.route.params.subscribe( params => {

            this._userProgressService.updateUnitLessonIds(+params['id_unit'], +params['id_lesson']);

            /**
             * If the progress array has already been initialized, update the progress 
             */
            if(this._userProgressService.isProgressInitialized()) 
                this._userProgressService.updateProgress();

        });

        this.progressObs = this._unitsService.getUnitIdLessonIdLessonTitle();

        this.progressObs.subscribe(
            progress => {
                this._userProgressService.addNewLessonProgress(progress);
            },                                // Happy path
            error    => console.log('Error getting units in user progress component: ',error),      // Error path
            ()       => this._userProgressService.updateProgress()   // onComplete
        );
    }    

}