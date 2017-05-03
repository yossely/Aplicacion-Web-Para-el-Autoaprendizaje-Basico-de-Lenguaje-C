/**
 * Holds the characters that the user wants to input to the C program
 * @type {String}
 *
 * This variable will be filled in the console_behavior.js, that file is loaded with --post-js
 */
var requestedInput = '';

var Module = {
    print: (function() {

        return function(text) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');

            // These replacements are necessary if you render to raw HTML
            //text = text.replace(/&/g, "&amp;");
            //text = text.replace(/</g, "&lt;");
            //text = text.replace(/>/g, "&gt;");
            //text = text.replace('\n', '<br>', 'g');
            
            // console.log('custom print: ',text);
            
            /* New value to insert in the console */
            var newValue = '> '+text+'\n';

            /* Append new text to the correspondent console element when a print function is called from the C code 
                Note: Updating inside the angular app render the console output later, not immediately as needed, that's
                      why the console update is processed here.
            */
            var consoleElement = document.getElementById(window.currentProblemRef.consoleId);
            if (consoleElement) {
              consoleElement.value += newValue;
              consoleElement.scrollTop = consoleElement.scrollHeight; // focus on bottom
            }

            /**
             * currentProblemRef is an object exposed in the problem component to be able to execute
             * its appendConsoleTextFn function outside angular thanks to zone.run
             *
             * The appendConsoleTextFn function receives the new text to be appended in the consoleOutput property,
             * which render the proper output when navigating between sections tabs in a lesson
             */
            window.currentProblemRef.zone.run( () => {
                                                    window.currentProblemRef.appendConsoleTextFn(newValue);
                                                });
        };
    })()
};