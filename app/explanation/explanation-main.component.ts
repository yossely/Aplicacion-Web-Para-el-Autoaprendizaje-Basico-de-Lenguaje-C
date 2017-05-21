import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { Explanation } from '../data_structure/explanation';

import { MarkdownParserService } from '../markdown/markdown-parser.service';

// import 'prismjs/prism';


@Component({
    selector: 'explanation-outlet',
    styleUrls: ['assets/css/explanation-main.css'],
    templateUrl: 'assets/partials/explanation/explanation-main.html'
})
export class ExplanationMainComponent implements OnInit, OnChanges{
    
    // This is the array to manipulate and navigate to the next section: 'Example' tab
    @Input() sectionsTabs: Array<any>;
    
    @Input() explanation: string;

    mdText: string;

    constructor(private md: MarkdownParserService){}

    ngOnInit(){
        
        this.mdText = this.md.convert(this.explanation);
        // console.log(this.mdText);

        // console.log('prism: ',Prism);
    }
    
    /**
     * Go to the next section, in this case 'Example'
     * Activate the 'Example Tab' and deactivate this tab (Explanation)
     */
    nextSection(){
        this.sectionsTabs[1].active = true;
        this.sectionsTabs[0].active = false;
    }

    /**
     * Angular calls its ngOnChanges method whenever it detects changes to input properties of the component (or directive)
     * 
     * param {SimpleChange} changes 
     *         Represents a basic change from a previous to a new value.
     */
    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        console.log('explanation must changed', changes);
        this.mdText = this.md.convert(this.explanation);
    }

}