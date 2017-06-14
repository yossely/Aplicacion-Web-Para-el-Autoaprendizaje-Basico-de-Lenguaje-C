import { Component, OnInit } from '@angular/core';


@Component({
    styleUrls: ['assets/css/howitworks.css'],
    templateUrl: 'assets/partials/howitworks.html'
})
export class HowItWorksComponent implements OnInit{

    constructor(){

    }

    ngOnInit(){

    }

    /**
     * Start the step by step tutorial to describe how the app works
     */
    startTutorial(){

        let intro = introJs();

        // Initialize steps
        intro.setOptions({
            steps: [
            {
                element: '#sentence_image',
                intro: "Lee <b>cuidadosamente</b> el enunciado del problema.",
                position: 'right'
            },
            {
                element: '#code_editor_image',
                intro: "Escribe el código para resolver el problema.",
                position: 'bottom'
            },
            {
                element: '#run_button_image',
                intro: '<span style="color: #5FD35F; font-weight: bold;">Compila</span> tu código fuente.',
                position: 'left'
            },
            {
                element: '#console_image',
                intro: "Observa la salida de tu código compilado.",
                position: 'right'
            },
            {
                element: '#expected_output_tab_image',
                intro: '<strong>Visualiza</strong> y <strong>Oculta</strong> la salida esperada del problema.',
                position: 'right'
            },
            {
                element: '#expected_output_console_image',
                intro: 'Compara tu salida con la salida esperada.',
                position: 'left'
            },
            {
                element: '#restore_button_image',
                intro: 'Restaura el código fuente al código original del problema.',
                position: 'left'
            }
            ]
        });

        intro.setOption("nextLabel", " > ");
        intro.setOption("prevLabel", " < ");
        intro.setOption("skipLabel", " Omitir ");
        intro.setOption("doneLabel", " ¡Listo! ");

        // Start step by step tutorial
        intro.start();
    }
}