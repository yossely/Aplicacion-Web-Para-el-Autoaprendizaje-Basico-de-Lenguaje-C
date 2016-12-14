import { Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';

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

    /**
     * @param {selector} 'editor' 
     *            selector - the directive type or the name used for querying.
     */
    @ViewChild('editor') editor;

    codeEditorOptions: any;

    constructor(){}

    ngOnInit(){
        this.codeEditorOptions = {
                displayIndentGuides: true,
                printMargin: true
            };
    }

    onChangeCodeInsideEditor(code){
        console.log('on change code inside editor: ',code);
    }

    executeCode(){
        console.log('execute code: ', this.editor.getEditor().getValue());
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
}