/**
 * Hold the characters that the user wants to input to the C program
 * @type {String}
 *
 * This variable will be filled in the console_behavior.js, that file is loaded with --post-js
 */
var requestedInput = '';

var Module = {
    print: (function() {

        var consoleElement = document.getElementById('console');

        return function(text) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
            // These replacements are necessary if you render to raw HTML
            //text = text.replace(/&/g, "&amp;");
            //text = text.replace(/</g, "&lt;");
            //text = text.replace(/>/g, "&gt;");
            //text = text.replace('\n', '<br>', 'g');
            console.log('custom print: ',text);
            if (consoleElement) {
                // Print new text inside the console
                var newText = document.createTextNode("> " + text + "\n");
                consoleElement.appendChild(newText);
                
                console.log('textarea element: ',consoleElement);
                // consoleElement.scrollTop = element.scrollHeight; // focus on bottom
            }
        };
    })()
};