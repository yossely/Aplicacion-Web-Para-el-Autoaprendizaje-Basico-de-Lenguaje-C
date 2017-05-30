import { Injectable } from '@angular/core';


@Injectable()
export class CheckPrintfService{

    constructor() {
    }

    /**
     * This functions receives a C program code, takes all the scanf sentences end inserts a printf("\\n"); 
     * before each one of them.
     * 
     * @param {string} cCode     C program code to review
     * 
     * @return {string}          C program code fixed
     */
    fixScanfSentences(cCode: string): string{
        /* Get all the occurrences of the regular expression in the cCode */
        let regexp = /(scanf[\s]*?\()"((?:\\.|[^"\\])*)"/g;
        let occurrencesOriginal = cCode.match(regexp);

        /* Reduce duplicate occurrences */
        let uniqueOcurrences = [];
        uniqueOcurrences = occurrencesOriginal.filter(function(item, pos) {
            return occurrencesOriginal.indexOf(item) == pos;
        });

        /*console.log(occurrencesOriginal);
        console.log(uniqueOcurrences);*/

        /* Get the wrong occurrences and fixe them */
        let wrongOccurrences = [], fixedOccurrences = [];

        uniqueOcurrences.map((currOccurrence) => {

            /* Add the wrong occurrence to the correspondent array */
            wrongOccurrences.push(currOccurrence);
            
            /* Add the fixed occurrence to the correspondent array */
            fixedOccurrences.push(currOccurrence.replace('s','printf("\\n"); s'));

            
        });

        /*console.log('wrong print: ',wrongOccurrences);
        console.log('all correct: ',fixedOccurrences);*/

        /* Replace the wrong occurrences with the fixed ones in the cCode */
        let cCodeFixed;

        for (var i = 0; i < fixedOccurrences.length; i++) {
            var re = new RegExp(this.escapeRegExp(wrongOccurrences[i]), 'g');
            cCodeFixed = cCode.replace(re,fixedOccurrences[i]);
            cCode = cCodeFixed;
        }

        console.log('cCode fixed: ',cCode);
        return cCode;
    }

    /**
     * Escaping user input to be treated as a literal string within a regular expression
     * @param {string} str [description]
     */
    escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    /**
     * This functions receives a C program code, takes all the printf sentences end check if the end
     * with a '\n', if not, puts a \n at the end of it.
     * 
     * @param {string} cCode C program code to review
     */
    fixPrintfSentences(cCode: string){

        /* Get all the occurrences of the regular expression in the cCode */
        var regexp = /(printf[\s]*?\()"((?:\\.|[^"\\])*)"/g;
        var occurrencesOriginal = cCode.match(regexp);

        /* If there is no printf statements in the code, then return the code with no changes */
        if (occurrencesOriginal == null)
            return cCode;
        
        /* Reduce duplicate occurrences */
        var uniqueOcurrences = [];
        uniqueOcurrences = occurrencesOriginal.filter(function(item, pos) {
            return occurrencesOriginal.indexOf(item) == pos;
        });

        /*console.log('occurrencesOriginal: ', occurrencesOriginal);
        console.log('uniqueOcurrences: ', uniqueOcurrences);*/

        /* Get the wrong occurrences and fixe them */
        var wrongOccurrences = [], fixedOccurrences = [];

        uniqueOcurrences.map((currOccurrence) => {

            if (!this.doesPrintfEndCorrectly(currOccurrence)) {
                /* Add the wrong occurrence to the correspondent array */
                wrongOccurrences.push(currOccurrence);
                
                /* Add the fixed occurrence to the correspondent array */
                fixedOccurrences.push(currOccurrence.replace(/.$/g,'\\n"'));
            }            
        });

        /*console.log('wrong print: ',wrongOccurrences);
        console.log('all correct: ',fixedOccurrences);*/

        /* Replace the wrong occurrences with the fixed ones in the cCode */
        for (var i = 0; i < fixedOccurrences.length; i++)
            cCode = cCode.replace(wrongOccurrences[i],fixedOccurrences[i]);

        // console.log('cCode fixed: ',cCode);
        return cCode;
    }

    /**
     * Check if the printf sentence end correctly  
     * @param  {string}     printfSentence  Printf sentence to check
     * @return {boolean}                    True -> Ending with \n"
     *                                      False -> NOT ending with \n"
     */
    doesPrintfEndCorrectly(printfSentence){

        var beforeNewLine = printfSentence.charAt(printfSentence.length-4);
        var endSentence = printfSentence.slice(-3);

        /* If the printf sentence end with \n" then it's ending correctly */
        if(beforeNewLine!=='\\' && endSentence == '\\n"'){
            return true;
        }

        return false;
    }
}