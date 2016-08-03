import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Unit } from '../data_structure/unit'
import { Lesson } from '../data_structure/lesson'

@Injectable()
export class UnitsService {

	private units: Unit[];
	private unitsUrl:string;
	
	constructor(private http: Http) {
		this.unitsUrl = '/dist/content/units.json';
	}

	getUnits(): Observable<Unit[]> {
		return this.http.get(this.unitsUrl)
          		.map(response => response.json())
          		.catch(this.handleError);  
    }

    getLesson(id_unit: number, id_lesson: number): Observable<Lesson> {
		return this.http.get(this.unitsUrl)
          		.map(response => response.json()) 
		        .map((units: Array<Unit>) => {
			      let result:Lesson;
			      if (units) {
			        units.forEach((unit) => {
			        	if(unit.id === id_unit) {
			        		unit.lessons.forEach((lesson) => {
			        			if(lesson.id === id_lesson) {
			        				result = lesson;
			        			}
			        		});
			        	}	          
			        });
			      }
			      return result;
			     })
		        .catch(this.handleError); 
    }

    private handleError(error: any){
    	// Dig deeper into the error to get a better message
	    let errMsg = (error.message) ? error.message :
	      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	    console.error(errMsg); // log to console instead
	    return Observable.throw(errMsg);
    }
}