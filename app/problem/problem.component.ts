/// <reference path="../../typings/globals/ace/index.d.ts" />
import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChange, 
         NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { UnitsService } from '../lessons/units.service';
import { ErrorHandlingService } from './error-handling.service';
import { CheckPrintfService } from './check-printf.service';
import { Problem } from '../data_structure/problem';

import { MarkdownParserService } from '../markdown/markdown-parser.service';
import { UserProgressService } from '../lessons/user-progress.service';
import { UserTestsInfoService } from '../test/user-tests-info.service';

import { ValidateSyntaxService } from './validate-syntax.service';
import { Annotation } from '../data_structure/editor-annotation'

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import 'brace';
import 'brace/theme/clouds';
import 'brace/mode/c_cpp';

import { UndoManager } from 'brace';

@Component({
    selector: 'problem-outlet',
    styleUrls: ['assets/css/problem.css'],
    templateUrl: 'assets/partials/problem/problem.html',
    providers: [ValidateSyntaxService]
})
export class ProblemComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy{
    
    @Input() problem: Problem;
    
    @Input() isOnExercises: boolean;

    cCompiledScriptUrl: string;
    cCompiledScriptId: string;

    isCompiling: boolean;

    consoleElementId: string;

    compileCCodeSubscription: any;

    isExpectedOutputHidden: boolean;

    /* Solution's Steps */
    currentStep: string;
    currentStepIndex: number;
    isCurrentStepFirst: boolean;
    isCurrentStepLast: boolean;

    /* Solution Feedback on test */
    alerts: any = [];

    /* Syntax Validation */
    currentCCode = new Subject<string>();

    /**
     * Ctrl+Z Bug in the exercises' editor, so its Undo Manager will be reset everytime the user navigates
     * between the exercises
     * 
     * Note: Default value must be true to prevent reset the editor undo manager for the example editor
     * @type {boolean}
     */
    isUndoManagerReset: boolean = true;

    /**
     * @param {selector} 'editor' 
     *            selector - the directive type or the name used for querying.
     */
    @ViewChild('editor') editor;

    codeEditorOptions: any;

    constructor(private _unitsService: UnitsService,
                private _ngZone: NgZone,
                private _errorHandlingService: ErrorHandlingService,
                private _checkPrintfService: CheckPrintfService,
                private md: MarkdownParserService,
                private _userProgressService: UserProgressService,
                private _userTestsInfoService: UserTestsInfoService,
                private _validateSyntaxService: ValidateSyntaxService){ }

    
    ngOnInit(){

        this.codeEditorOptions = {
                displayIndentGuides: true,
                printMargin: true
            };

        this.cCompiledScriptUrl = 'http://localhost:3000/user_code_folder/user_code_compiled.js';
        this.cCompiledScriptId = 'cCompiledScript';

        this.isCompiling = false;

        this._validateSyntaxService.validateSyntax(this.currentCCode)
                .subscribe( 
                    (results: Annotation[]) => {
                        // Display errors and warnings in the editor
                        this.showErrorOnEditor(results);
                    },
                    error => {
                        console.log('Error in the syntax validation process: ', error);
                    },
                    () => console.log('Syntax Validation finished')
                );
    }


    showErrorOnEditor(annotations: Annotation[]){

        /* Set Annotations in the editor to indicate possible errors and warnings inside the editor */
        this.editor.getEditor()
                   .getSession()
                   .setAnnotations(annotations);
    }


    /**
     * Initialize the current solution step to show the first one
     */
    initializeStepsOnExample(){

        this.currentStepIndex = 0;
        this.currentStep = this.problem.solutionSteps[this.currentStepIndex];

        this.isCurrentStepLast = false;
        this.isCurrentStepFirst = true;
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
                updateConsoleTextFn: (newValue) => this.updateConsoleText(newValue),
                checkOutputFn: () => this.checkOutput(),
                /*This property is for debug purposes*/
                consoleId: this.problem.consoleId
            };
    }


    /**
     * Perform Syntax Validation process when the code inside Ace Editor change
     * 
     * @param {string} code New code inside the Ace Editor
     */
    onChangeCodeInsideEditor(code){
        //pass the new code to the subject to validate its syntax
        this.currentCCode.next(code);

        console.log('Code Inside Editor Change');

        /**
         * If the Undo Manager hasn't been reset, then proceed to reset it
         *
         * Note: when navigating between the exercises, the code inside the editor changes twice,
         *       the first time is '' (empty) and the second time is set to the exercise code
         */
        if (!this.isUndoManagerReset && code !== '') {
            this.resetUndoManagerEditor();

            this.isUndoManagerReset = true;
        }
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

        var cCode = this._checkPrintfService.fixScanfSentences(this.editor.getEditor().getValue());
        
        this.compileCCodeSubscription = this._unitsService.compileCCode(cCode)
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

        // console.log("code editor options: ",Object.keys(this.editor.getEditor().$options));


        // Reset the code editors' Undo Manager (example and exercises section) the first time the component view has been initialized
        this.resetUndoManagerEditor();

    }

    /**
     * Reset the UndoManager property for the editor
     *
     * This property controls the undo history that permits the 'Ctrl+Z' functionality in the editor
     */
    resetUndoManagerEditor(){
        this.editor.getEditor()
                   .getSession()
                   .setUndoManager(new UndoManager());
    }

    /**
     * Angular calls its ngOnChanges method whenever it detects changes to input properties of the component (or directive)
     * 
     * @param changes: {[propKey: string]: SimpleChange}
     *         Represents a basic change from a previous to a new value.
     */
    ngOnChanges(changes: any){

        this.isExpectedOutputHidden = true;

        // Every time the problem changes, initialize the solution steps to show the first one
        if(!this.isOnExercises)
            this.initializeStepsOnExample();

        // Set original code to the code of the problem selected only if it has not been set yet
        if (!this.problem.originalCode) 
            this.problem.originalCode = this.problem.code;

        
        // When navigating between the exercises (changing problems), reset its Undo Manager
        if (this.isOnExercises && !changes.isOnExercises)
            this.isUndoManagerReset = false;
        

        console.log('problem changed', changes);
        // console.log(this.problem.consoleOutput);        
    }


    /**
     * Clean the console (removes all text) before adding the C Compiled code into the webpage
     */
    cleanConsole(){
        document.getElementById(this.problem.consoleId).innerHTML = '';
        this.problem.consoleOutput = '';
    }


    /**
     * Update the text in the consoleOutput property of the current problem
     *
     * This method will be called outside the angular app, specifically in the module_configuration.js
     * 
     * @param {string} newValue The new text of the consoleOutput
     */
    updateConsoleText(newValue: string){
        this.problem.consoleOutput = newValue;

        // console.log("this is the new output: ", this.problem.consoleOutput);
    }

    /**
     * Check if the user's output is correct to update the score of the test
     *
     * The user's solution is compare against the real console output (strings stored in the tests database),
     * the whitespaces are removed in both strings and then, are compared, if they're equal, the user's solution
     * is considered correct
     */
    checkOutput(){

        /* If the user is NOT on a test, do not check the solution */
        if (!this._userProgressService.isOnTest())
            return;

        // replace all the whitespaces from the user solution output and the real expected output
        let currentConsoleOutput = this.problem.consoleOutput.replace(/\s+/g, '');
        let realConsoleOutput = this.problem.realOutput.replace(/\s+/g, '');
        
        // console.log('currentConsoleOutput: ',currentConsoleOutput);
        // console.log('realConsoleOutput: ',realConsoleOutput);

        // check if the user solution output is correct and update the score of the current problem
        if(currentConsoleOutput == realConsoleOutput){
            console.log('Correct output!');
            this._userTestsInfoService.updateScore(this.problem);
            
            // Show message on correct solution
            this.alerts.push({
                type: 'exercise-correct',
                messageText:{
                                main: '¡Excelente!',
                                body: 'Programa resuelto exitosamente.'
                            },
                timeout: 5000
            });

        }else{
            // Show message on wrong solution
            this.alerts.push({
                type: 'wrong-exercise',
                messageText:{
                                main: '¡Ooops!',
                                body: 'Revisa tu programa y vuelve a intentarlo.'
                            },
                timeout: 5000
            });
        }
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
     * Restore the original code of the problem if needed
     */
    restoreOriginalCode(){
        this.problem.code = this.problem.originalCode;
    }


    /**
     * Show or hide the expected output for an exercise
     */
    showHideExpectedOutput(){
        this.isExpectedOutputHidden = !this.isExpectedOutputHidden;
    }


    /**
     * Show the next solution step in an example
     */
    nextStepExample(){
        this.currentStepIndex++;
        
        this.currentStep = this.problem.solutionSteps[this.currentStepIndex];

        this.setStepFirstLast();
    }


    /**
     * Show the previous solution step in an example
     */
    previousStepExample(){
        this.currentStepIndex--;
        
        this.currentStep = this.problem.solutionSteps[this.currentStepIndex];

        this.setStepFirstLast();
    }


    /**
     * Check if the current solution step is the first or last one and set the correspondent boolean variables
     */
    setStepFirstLast(){

        if(this.currentStepIndex === 0)
            this.isCurrentStepFirst = true;
        else
            this.isCurrentStepFirst = false;

        if(this.currentStepIndex === (this.problem.solutionSteps.length-1))
            this.isCurrentStepLast = true;
        else
            this.isCurrentStepLast = false;

        console.log('curr index: ', this.currentStepIndex);
    }


    /**
     * Cleanup just before Angular destroys the component. 
     * Unsubscribe observables and detach event handlers to avoid memory leaks. 
     */
    ngOnDestroy(){

        (<any>window).currentProblemRef = null;

        if(this.compileCCodeSubscription)
            this.compileCCodeSubscription.unsubscribe();
    }

}