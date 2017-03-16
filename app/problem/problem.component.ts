import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChange, 
         NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UnitsService } from '../lessons/units.service';
import { ErrorHandlingService } from './error-handling.service';
import { Problem } from '../data_structure/problem';

import 'brace';
import 'brace/theme/clouds';
import 'brace/mode/c_cpp';

@Component({
    selector: 'problem-outlet',
    styleUrls: ['assets/css/problem.css'],
    templateUrl: 'assets/partials/problem/problem.html'
})
export class ProblemComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy{
    
    @Input() problem: Problem;
    
    @Input() isOnExercises: boolean;

    cCompiledScriptUrl: string;
    cCompiledScriptId: string;

    isCompiling: boolean;

    consoleElementId: string;

    compileCCodeSubscription: any;


    /**
     * @param {selector} 'editor' 
     *            selector - the directive type or the name used for querying.
     */
    @ViewChild('editor') editor;

    codeEditorOptions: any;

    constructor(private _unitsService: UnitsService,
                private _ngZone: NgZone,
                private _errorHandlingService: ErrorHandlingService){ }

    
    ngOnInit(){
        this.codeEditorOptions = {
                displayIndentGuides: true,
                printMargin: true
            };

        this.cCompiledScriptUrl = 'http://localhost:3000/user_code_folder/user_code_compiled.js';
        this.cCompiledScriptId = 'cCompiledScript';

        this.isCompiling = false;

        console.log("current problem: ",this.problem.consoleId);

    }


    /**
     * Expose publicly the method appendConsoleText to be able to call it from the JS obtained from
     * emcc compilation process
     *
     *     Specifically expose the zone object to run the method appendConsoleText from outside the
     *     angular application
     *
     *  @ref: http://stackoverflow.com/a/35297044/5932537
     */
    setWindowCurrentProblemRef(){
        (<any>window).currentProblemRef = {
                zone:                this._ngZone,
                appendConsoleTextFn: (newValue) => this.appendConsoleText(newValue),
                /*This property is for debug purposes*/
                consoleId: this.problem.consoleId
            };
    }


    /**
     * Perform XXXXX when the code inside Ace Editor change
     *
     *     -TODO: probably save the code into the database or something...
     * 
     * @param {string} code New code inside the Ace Editor
     */
    onChangeCodeInsideEditor(code){
        // console.log('on change code inside editor: ',code);
    }

    
    /**
     * Send the http request through the service to compile the C Code into JS
     */
    runCCode(){

        /**
         * Set current problem reference in the window object JUST before compile the C code to set the 
         * correct problem (example, exercice-1, exercice-2 or exercice-3)
         */
        this.setWindowCurrentProblemRef();

        // Variable to show the 'Compiling' message instead of the 'Run' button on the Ace Editor
        this.isCompiling = true;
        
        this.compileCCodeSubscription = this._unitsService.compileCCode(this.editor.getEditor().getValue())
                                       .subscribe(
                                            data => {
                                                console.log('From the get compileCode: ',data);
                                            }, //Bind to view
                                            err => {
                                                this.isCompiling = false;
                                                // Log errors if any
                                                console.log('Error compiling the C Code: ',err);
                                                // Show error messages on my console
                                                this.showCompileErrorOnConsole(err.text());
                                            },
                                            () => {
                                                this.isCompiling = false;
                                                console.log('C code compiled successfully');

                                                this.cleanConsole();
                                                
                                                // load the script and attach it to the document
                                                this.loadCCompiledScript();
                                            }
                                        );
    }

    /**
     * View queries are set before the ngAfterViewInit callback is called. This means that children have already be set (@ViewChild)
     */
    ngAfterViewInit(){
        this.editor.setTheme("clouds");
        this.editor.setMode("c_cpp"); 
        this.editor.getEditor().$blockScrolling = Infinity;

        console.log("code editor options: ",Object.keys(this.editor.getEditor().$options));

    }

    /**
     * Angular calls its ngOnChanges method whenever it detects changes to input properties of the component (or directive)
     * 
     * param {SimpleChange} changes 
     *         Represents a basic change from a previous to a new value.
     */
    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log('problem changed', changes);
        console.log(this.problem.consoleOutput);        
    }


    /**
     * Clean the console (removes all text) before adding the C Compiled code into the webpage
     */
    cleanConsole(){
        this.problem.consoleOutput = '';
    }


    /**
     * Append new text in the console text
     *
     * This method will be called outside the angular app, specifically in the module_configuration.js
     * 
     * @param {string} newValue The new text to be appended at the end of the consoleOutput
     */
    appendConsoleText(newValue: string){
        this.problem.consoleOutput += newValue;
        console.log("this is the new output: ", this.problem.consoleOutput);
    }


    /**
     * Loads the C Compiled code script into the web page
     */
    loadCCompiledScript(){
        console.log('preparing to load...');
        
        // Check if the script is already in the document, if so, remove it
        var oldCScript = document.getElementById(this.cCompiledScriptId);
        if(oldCScript) {
            oldCScript.parentNode.removeChild(oldCScript);
            console.log('old script Removed');
        }

        // Create and append C Compiled Script to the document
        let cScript = document.createElement('script');
        cScript.id = this.cCompiledScriptId;
        cScript.src = this.cCompiledScriptUrl;
        cScript.type = 'text/javascript';
        cScript.async = true;
        cScript.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(cScript);
        console.log('C Compiled script added');
    }


    /**
     * Show the error message got from the http request from the C code compilation process 
     * 
     * @param {string} errorMessage Error message text from the compilation process
     */
    showCompileErrorOnConsole(errorMessage: string){
        // console.log('errorMessage to show in my console: ',errorMessage);
        console.log('Error to show in console with id: ',this.consoleElementId);

        this.problem.consoleOutput = this._errorHandlingService.removeNeedlessInformation(errorMessage);
    }


    /**
     * Cleanup just before Angular destroys the component. 
     * Unsubscribe observables and detach event handlers to avoid memory leaks. 
     */
    ngOnDestroy(){

        (<any>window).currentProblemRef = null;

        this.compileCCodeSubscription.unsubscribe();
    }

}