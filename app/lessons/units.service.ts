import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Unit } from '../data_structure/unit';
import { Lesson } from '../data_structure/lesson';
import 'rxjs/Rx';

@Injectable()
export class UnitsService{
 
    private baseUrl: string;

    constructor(private _http: Http){
        this.baseUrl = "http://localhost:3000";
    }

    getAll(): Observable<Unit[]>{
        // console.log('GET request to: ',this.baseUrl);
        let units$ = this._http
            .get(`${this.baseUrl}/content`, {headers: this.getHeaders()})
            .map(mapUnits);
        
        return units$;
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        
        return headers;
    }

    get(id: number): Observable<Unit>{
        let unit$ = this._http
            .get(`${this.baseUrl}/unit/${id}`, {headers: this.getHeaders()})
            .map(mapUnit)
            .catch(handleError);

        return unit$;
    }

    getLesson(id_unit: number, id_lesson: number): Observable<Lesson>{
        let lesson$ = this._http
            .get(`${this.baseUrl}/unit/${id_unit}/lesson/${id_lesson}`, {headers: this.getHeaders()})
            .map(mapLesson)
            .catch(handleError);

        return lesson$;
    }

    save(unit: Unit) : Observable<Response>{
        // this won't actually work because the StarWars API doesn't 
        // is read-only. But it would look like this:
        console.log('unit service save() called');
        return this._http
                .put(`${this.baseUrl}/unit/${unit._id}`, JSON.stringify(unit), {headers: this.getHeaders()});
    }

    compileCCode(c_code: string): Observable<string>{
        console.log('need to compile this C program: ',c_code);

        // let params  = new URLSearchParams();
        // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: this.getHeaders() }); // Create a request option


        // params.set('cCode', c_code);

        // POST - Submits data to be processed to a specified resource
        let cCode$ = this._http
            .post(`${this.baseUrl}/unit/1/lesson/1/compileCCode`, 
                    {
                        c_code
                    }
                )
            .map(mapCCode);

        return cCode$;
    }

}

//-------------------------- FUNCTIONS ON --------------------------

function mapCCode(response:Response): string{
    console.log('response from mapCCode: ',response);
    return response.json();
}

function toCCode(result: any): string {
    // body...
    let cCodeCompiled = result.code;
    console.log('result from toCCode: ',result, cCodeCompiled);
    return cCodeCompiled;
}


/**
 * Parse the Http response to a Unit object
 * 
 * @param  {Response} response 
 *         Http Response
 *         
 * @return {Unit}              The Unit got from the Http request
 */
function mapUnit(response:Response): Unit{

    // Transform the response to an Unit object
    return toUnit(response.json());
}


/**
 * Parse the Http response to an array of Unit objects
 * 
 * @param  {Response} response 
 *         Http Response
 *         
 * @return {Unit[]}            The array of Units got from the Http request
 */
function mapUnits(response:Response): Unit[]{
    // The response of the API has a results
    // property with the actual results
    
    // Simulate an error
    // throw new Error('ups!!!');
    
    // Transform the response to an Unit object
    return response.json().map(toUnit)
}

/**
 * Parse an object of any type to a Unit object
 * 
 * @param  {any}  result 
 *         The object where is the Unit data
 *         
 * @return {Unit}        The Unit with all the data loaded
 */
function toUnit(result:any): Unit{
    let unit = <Unit>({
        _id: result._id,
        title: result.title,
        lessons: result.lessons
    });
    // console.log('Parsed unit:', unit);
    return unit;
}


/**
 * Parse the Http response to a Lesson object
 * 
 * @param  {Response} response 
 *         Http Response
 *         
 * @return {Lesson}              The Lesson got from the Http request
 */
function mapLesson(response:Response): Lesson{

    // Transform the response to an Unit object
    return toLesson(response.json());
}

/**
 * Parse an object of any type to a Lesson object
 * 
 * @param  {any}  result 
 *         The object where is the Lesson data
 *         
 * @return {Leson}        The Lesson with all the data loaded
 */
function toLesson(result:any): Lesson{
    // console.log('before convert it toLesson - result: ',result);
    let lesson = <Lesson>({
        _id: result._id,
        title: result.title,
        content: result.content,
        explanation: result.explanation,
        example: result.example,
        exercises: result.exercises
    });
    console.log('Parsed lesson:', lesson);
    return lesson;
}

/**
 * This function will handle the error of the GET request if exists
 *
 * Note: this could also be a private method of the component class
 * 
 * @param {any} error The error that occurs
 */
function handleError (error: any) {
    // log error
    // could be something more sophisticated
    let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}