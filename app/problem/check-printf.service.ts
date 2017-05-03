import { Injectable } from '@angular/core';


@Injectable()
export class CheckPrintfService{

    constructor() {
    }

    fixPrintfSentences(cCode: string){
        
        /* Get all the occurrences of the regular expression in the cCode */
        var regexp = /(printf[\s]*?\()"((?:\\.|[^"\\])*)"/g;
        var occurrencesOriginal = cCode.match(regexp);

        /* Reduce duplicate occurrences */
        var uniqueOcurrences = [];
        uniqueOcurrences = occurrencesOriginal.filter(function(item, pos) {
            return occurrencesOriginal.indexOf(item) == pos;
        });

        console.log(occurrencesOriginal);
        console.log(uniqueOcurrences);

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

        console.log('wrong print: ',wrongOccurrences);
        console.log('all correct: ',fixedOccurrences);

        /* Replace the wrong occurrences with the fixed ones in the cCode */
        var cCodeFixed;

        for (var i = 0; i < fixedOccurrences.length; i++) {
            cCodeFixed = cCode.replace(wrongOccurrences[i],fixedOccurrences[i]);
            cCode = cCodeFixed;
        }

        return cCodeFixed;
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

        // console.log('beforeNewLine: ',beforeNewLine);
        // console.log('endSentence: ',endSentence);

        /* If the printf sentence end with \n" then it's ending correctly */
        if(beforeNewLine!=='\\' && endSentence == '\\n"'){
            return true;
        }

        // console.log('correct me: ',printfSentence);

        return false;
    }
}