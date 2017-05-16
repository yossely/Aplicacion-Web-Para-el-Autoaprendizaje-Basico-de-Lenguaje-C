import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Test } from '../data_structure/test';

@Injectable()
export class TestsService{
 
    private baseUrl: string;

    constructor(private _http: Http){
        this.baseUrl = "http://localhost:3000";

    }

    getAll(): Observable<Test[]>{
        // console.log('GET request to: ',this.baseUrl);
        let tests$ = this._http
            .get(`${this.baseUrl}/tests`, {headers: this.getHeaders()})
            .map(mapTests);
        
        return tests$;
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        
        return headers;
    }

    getTestById(id: number): Observable<Test>{
        let test$ = this._http
            .get(`${this.baseUrl}/test/${id}`, {headers: this.getHeaders()})
            .map(mapTest)
            .catch(handleError);

        return test$;
    }
}

//-------------------------- FUNCTIONS ON --------------------------

/**
 * Parse the Http response to a Test object
 * 
 * @param  {Response} response 
 *         Http Response
 *         
 * @return {Test}              The Test got from the Http request
 */
function mapTest(response:Response): Test{
    // Transform the response to an Test object
    return toTest(response.json());
}


/**
 * Parse the Http response to an array of Test objects
 * 
 * @param  {Response} response 
 *         Http Response
 *         
 * @return {Test[]}            The array of Tests got from the Http request
 */
function mapTests(response:Response): Test[]{
    // The response of the API has a results
    // property with the actual results
    
    // Simulate an error
    // throw new Error('ups!!!');
    
    // Transform the response to an Unit object
    return response.json().map(toTest)
}


/**
 * Parse an object of any type to a Test object
 * 
 * @param  {any}  result 
 *         The object where is the Test data
 *         
 * @return {Test}        The Test with all the data loaded
 */
function toTest(result:any): Test{
    console.log(result);
    let test = <Test>({
        id: result._id,
        title: result.title,
        problems: result.problems,
        userScore: 0
    });
    console.log('Parsed test:', test);
    return test;
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
    let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your TESTS data!`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}