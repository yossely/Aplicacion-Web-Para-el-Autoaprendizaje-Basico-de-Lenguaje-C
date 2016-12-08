import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { Explanation } from '../data_structure/explanation';

@Component({
    selector: 'explanation-outlet',
    styleUrls: ['assets/css/explanation-main.css'],
    templateUrl: 'assets/partials/explanation/explanation-main.html'
})
export class ExplanationMainComponent implements OnInit, OnChanges{
    
    // This is the array to manipulate and navigate to the next section: 'Example' tab
    @Input() sectionsTabs: Array<any>;
    
    @Input() explanations: Array<Explanation>;

    
    selectedExplanation: Explanation;
    
    selectedExplanationIndex: number;

    isSelectedExplanationFirst: boolean;
    isSelectedExplanationLast: boolean;

    // Indicates if this component has been initialized or not
    hasBeenInit: boolean = false;


    constructor(){}

    ngOnInit(){
        
        // The first time init this component, the selected explanation will be the first
        this.selectedExplanationIndex = 0;
        
        this.selectedExplanation = this.explanations[this.selectedExplanationIndex];

        // Check if the selected explanation is first or last
        this.navigationButtonsConditions();

        // Mark this component as initialized
        this.hasBeenInit = true;
    }

    /**
     * Set the two conditions to show correctly the navigation buttons in the explanation section.
     * This makes possible to display the 'Previous', 'Next' and 'Next Section' buttons depending on the selected 
     * explanation.
     */
    navigationButtonsConditions(){
        /**
         * Is the selected explanation the FIRST one?
         * @type {Boolean}
         *       True -> Yes, it is
         *       False -> No, it isn't
         */
        this.isSelectedExplanationFirst = (this.selectedExplanationIndex === 0);

        /**
         * Is the selected explanation the LAST one?
         * @type {Boolean}
         *       True -> Yes, it is
         *       False -> No, it isn't
         */
        this.isSelectedExplanationLast = (this.selectedExplanationIndex === (this.explanations.length -1));
    }

    /**
     * Navigate to the PREVIOUS explanation
     */
    previousExplanation(){
        this.selectedExplanationIndex--;
        
        this.selectedExplanation = this.explanations[this.selectedExplanationIndex];
        
        this.navigationButtonsConditions();
    }
    
    /**
     * Navigate to the NEXT explanation
     */
    nextExplanation(){
        this.selectedExplanationIndex++;
        
        this.selectedExplanation = this.explanations[this.selectedExplanationIndex];

        this.navigationButtonsConditions();
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
        // console.log('explanations changed', changes);
        
        /**
         * If this component has already been initialized and changes, update the selected explanation
         *
         * This condition is needed because the first time this lifecycle hook is called is before the ngOnInit hook and then, 
         * the properties of this component has not been set yet.
         */
        if( this.hasBeenInit ) {
            this.selectedExplanationIndex = 0;
            this.selectedExplanation = this.explanations[this.selectedExplanationIndex];
            // Check if the selected explanation is first or last
            this.navigationButtonsConditions();
        }
    }

}