/* Hold the characters that the user wants to input to the C program
 * This variable is defined in the module_configuration.js file, because that file is loaded with --pre-js and over there is where 
 * the Module stdin function is modified to sent the requestedInput value
 *     var requestedInput = '';
*/

// Indicates how many characters the user can delete
var allowCharacterDeleted = 0;

var consoleElement = document.getElementById('console-exercise-1');

consoleElement.addEventListener('keyup',function(keyPressed){
    /* Note:
     *      - On keypress 'charCode' is who holds the CHARACTERS ascii code
     *      - On keypress 'keyCode' is who holds the NON Characters (enter, backspace...) ascii code
     *      - On keyup 'keyCode' is who holds the ascii code of all
    */

    /* ToDo: 
     *      -Handle the arrow keys to not allow move to a different place and delete another thing
     *      -Handle the key on a different place and delete another thing
    */  
    console.log('keypressed: ', keyPressed);

    // BACKSPACE code
    if( keyPressed.keyCode === 8 ){
        // Delete a character if allowed
        if( allowCharacterDeleted > 0 ){
            requestedInput = requestedInput.slice(0, -1);
            allowCharacterDeleted--;
            console.log('character deleted');
        }
        /**
         * ToDo:
         *     - Not allow the user delete the text already printed in the console by the C program
         */
        else{
            console.log('you can not delete!');
            keyPressed.preventDefault();
            keyPressed.stopPropagation();
        }
    }
    else{
        // ENTER code (send the word to the emcc script)
        if(keyPressed.keyCode === 13){
            // Restore default values for the next input request
            requestedInput = '';
            allowCharacterDeleted = 0;
            console.log('enter pressed... done!');
            /**
             * ToDo:
             *     - Resume the enterpreter to send the requestedInput
             */
            // inputReady();
        }
        else{
            // CHARACTER (add the character to the requestedInput)
            if(keyPressed.keyCode >= 32 && keyPressed.keyCode <= 127){
                requestedInput+=keyPressed.key;
                allowCharacterDeleted++;
                console.log('string to send: ',requestedInput);
            }
        }
    }
});

/*
function inputReady() {
    console.log('resume the C program to read this: ',desiredInput);
    // console.log('stops[whichStop]: ',stops[whichStop]);
    Module.emterpreter.notifyAbout(stops[whichStop]);
    // Module.emterpreter.notifyAbout(stops[whichStop++]);
}
 */