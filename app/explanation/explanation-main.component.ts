import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'explanation-outlet',
    styleUrls: ['assets/css/explanation-main.css'],
    templateUrl: 'assets/partials/explanation/explanation-main.html'
})
export class ExplanationMainComponent implements OnInit{
    
    // This is the array to manipulate and navigate to the next section: 'Example' tab
    @Input() sectionsTabs: Array<any>;

    allExplanation: string[];
    
    selectedExplanation: string;
    selectedExplanationIndex: number;

    isSelectedExplanationFirst: boolean;
    isSelectedExplanationLast: boolean;


    constructor(){}

    ngOnInit(){
        
        this.allExplanation = ['Explanation Eins', 'Explanation Zwei', 'Explanation Drei'];
        
        // The first time init this componenet, the selected explanation will be the first
        this.selectedExplanationIndex = 0;
        this.selectedExplanation = this.allExplanation[this.selectedExplanationIndex];

        // Check if the selected explanation is first or last
        this.navigationButtonsConditions();
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
        this.isSelectedExplanationLast = (this.selectedExplanationIndex === (this.allExplanation.length -1));
    }

    /**
     * Navigate to the PREVIOUS explanation
     */
    previousExplanation(){
        this.selectedExplanationIndex--;
        this.selectedExplanation = this.allExplanation[this.selectedExplanationIndex];
        
        this.navigationButtonsConditions();
    }
    
    /**
     * Navigate to the NEXT explanation
     */
    nextExplanation(){
        this.selectedExplanationIndex++;
        this.selectedExplanation = this.allExplanation[this.selectedExplanationIndex];

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

}