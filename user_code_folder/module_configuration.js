/**
 * Hold the characters that the user wants to input to the C program
 * @type {String}
 *
 * This variable will be filled in the console_behavior.js, that file is loaded with --post-js
 */
var requestedInput = '';

var Module = {
    print: (function() {

        return function(text) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
            
            // window.app.problem.consoleOutput = text;
            // These replacements are necessary if you render to raw HTML
            //text = text.replace(/&/g, "&amp;");
            //text = text.replace(/</g, "&lt;");
            //text = text.replace(/>/g, "&gt;");
            //text = text.replace('\n', '<br>', 'g');
            console.log('custom print: ',text);

            /**
             * currentProblemRef is an object exposed in the problem component to be able to execute
             * its appendConsoleTextFn function outside angular thanks to zone.run
             *
             * The appendConsoleTextFn function receives the new text to be appended in the consoleOutput property
             */
            window.currentProblemRef.zone.run( () => {
                                                    window.currentProblemRef.appendConsoleTextFn('> '+text+'\n');
                                                });
        };
    })()
};