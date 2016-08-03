import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Unit } from '../data_structure/unit';
import { UnitsService } from './units.service';

@Component({
	styleUrls: ['dist/assets/css/niveles.css'],
    templateUrl: 'dist/assets/partials/nivel.html',
    providers: [UnitsService],
    directives: [ROUTER_DIRECTIVES]
})

export class UnitsComponent implements OnInit{
	private units: Unit[];

	constructor(private unitsService: UnitsService){}

	ngOnInit(){
		this.unitsService.getUnits()
            .subscribe(
                result => {
                	this.units = result; 
                    console.log('Units ready ');
                	console.log(this.units);
                }
            );
	}
}