import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { UnitsService } from '../lessons/units.service';
import { Unit } from '../data_structure/unit';

// This component will render the content of the site, that means the units and their lessons

@Component({
    styleUrls: ['assets/css/content.css'],
    templateUrl: 'assets/partials/content.html'
})
export class ContentComponent implements OnInit{
        
    unitsObs: Observable<Unit[]>;
    private selectedId: number;

    units: Unit[] = [];
    selectedUnit: Unit;
    isLoading: boolean = true;
    errorMsg: string = '';

    constructor(
        private _unitsService:UnitsService,
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(){
        this.unitsObs = this.route.params
            .switchMap((params: Params) => {
                this.selectedId = +params['id_unit'];
                return this._unitsService.getAll();
            }
         );

        this.unitsObs.subscribe(
            u     => this.units = u,         // Happy path
            error => this.errorMsg = error,  // Error path
            ()    => this.isLoading = false  // onComplete
        );
    }

    isSelected(unit: Unit){
        return unit._id === this.selectedId;
    }

}