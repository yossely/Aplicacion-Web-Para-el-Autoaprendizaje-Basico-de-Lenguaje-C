import { Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UnitsService } from '../lessons/units.service';
import { Problem } from '../data_structure/problem';

import 'brace';
import 'brace/theme/clouds';
import 'brace/mode/c_cpp';

@Component({
    selector: 'problem-outlet',
    styleUrls: ['assets/css/problem.css'],
    templateUrl: 'assets/partials/problem/problem.html'
})
export class ProblemComponent implements OnInit, AfterViewInit{
    
    @Input() problem: Problem;
    
    @Input() isOnExercises: boolean;

    cCompiledScriptUrl: string;
    cCompiledScriptId: string;

    isCompiling: boolean;

    consoleElementId: string;


    /**
     * @param {selector} 'editor' 
     *            selector - the directive type or the name used for querying.
     */
    @ViewChild('editor') editor;

    codeEditorOptions: any;

    constructor(private _unitsService: UnitsService){}

    ngOnInit(){
        this.codeEditorOptions = {
                displayIndentGuides: true,
                printMargin: true
            };

        this.cCompiledScriptUrl = 'http://localhost:3000/user_code_folder/test.js';
        this.cCompiledScriptId = 'cCompiledScript';

        this.isCompiling = false;

        this.consoleElementId = 'console';
    }

    onChangeCodeInsideEditor(code){
        console.log('on change code inside editor: ',code);
    }

    runCCode(){

        this.isCompiling = true;

        console.log('execute code: ', this.editor.getEditor().getValue());
        
        this._unitsService.compileCCode(this.editor.getEditor().getValue())
                           .subscribe(
                                data => {
                                    console.log('From the get compileCode: ',data);
                                }, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log('Error compiling the C Code: ',err);
                                },
                                () => {
                                    this.isCompiling = false;
                                    console.log('C code compiled successfully');
                                    
                                    // Clean console text before runnning the code
                                    this.cleanConsole();

                                    // load the script and attach it to the document
                                    this.loadCCompiledScript();
                                });
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

    cleanConsole(){
        var consoleElement = document.getElementById(this.consoleElementId);

        // consoleElement.innerHTML = '';

        while (consoleElement.firstChild) {
            console.log('child to remove from console: ',consoleElement.firstChild);
            consoleElement.removeChild(consoleElement.firstChild);
        }
    }

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

}