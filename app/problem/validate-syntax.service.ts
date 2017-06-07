import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';


@Injectable()
export class ValidateSyntaxService{

    public _urlStream: Subject<string>;
    public _urlObserver: Observable<string>;

    private baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = "http://localhost:3000";
    }

    /**
     * Takes in an Observable of strings representing the code of the program to be evaluated
     * @param {Observable<string>} cCode code of the program to be evaluated
     */        
    validateSyntax(cCode: Observable<string>){

        /**
         * Wait until there’s no new data for 400ms until it lets the next data through
         *
         * switchMap combines multiple possible observables received from the getValidation method into one, 
         * which ensures that we use the results from the latest request only.
         */
        return cCode.debounceTime(400)
                    .switchMap(cCode => this.getValidation(cCode));
    }

    /**
     * This method makes a POST request to the server with the program's code and returns another observable. 
     * Using the map operator transform the syntax validation response to the array of annotations needed.
     * 
     * @param {string} cCode code of the program to be evaluated
     */
    getValidation(cCode) {
        return this._http
                    .post(this.baseUrl + '/validateSyntax',{cCode})
                    .map( response => {
                            // console.log('response: ',response.text());
                            return response.text();
                        }
                    )
                    .map( errorMessage => {
                            // console.log('errorMessage: ',errorMessage, errorMessage === '"no syntax errors"');
                            if (errorMessage === '"no syntax errors"')
                                return [];
                            else
                                return this.transformMessageToAnnotations(errorMessage);
                        }
                    );
    }

    /**
     * Create and return a header object ready to be used in an http request
     */
    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        
        return headers;
    }

    /**
     * Transform the validation syntax error message to the array of annotations to be set in the editor
     * @param  {string}        errorMessage Error message got from the syntax validation response
     * @return {Array<Object>}              Array of annotations to be set in the editor
     */
    transformMessageToAnnotations(errorMessage: string): Array<Object>{

        let annotations:any = [];

        let lines = errorMessage.split("\n");

        let errorLineDetectionSentence: string = "user_code_folder/validate_user_code.c";

        for (var i = 0; i < lines.length; i++) {
            if(lines[i].includes(errorLineDetectionSentence)){
                // console.log('error line: ', lines[i]);
                
                // Separate the row, column, and type of annotation from the error message
                let info = lines[i].split(':',4);
                annotations.push({
                            row: parseInt(info[1])-1, //zero based
                            column: info[2],
                            text: lines[i].substring(info.join(':').length + 2),
                            type: info[3].replace(/\s+/g, '') // accepts: error, warning and info (although in C there's no 'info' type)
                        });
            }
        }
        // console.log('annotations ready: ',annotations);

        return annotations;
    }
    
}