import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { UnitsService } from './units.service';
import { Lesson } from '../data_structure/lesson';


@Component({
    styleUrls: ['assets/css/lesson-details.css'],
    templateUrl: 'assets/partials/lesson.html'
})
export class LessonDetailsComponent implements OnInit, OnDestroy, AfterViewInit{

    paramsSub: any;
    // paramsSub: Observable<Lesson>;

    private sub: any;
    private id_unit: number;
    private id_lesson: number;
    private lesson: Lesson;

    public sectionsTabs:Array<any>;

    constructor (private _unitsService: UnitsService,
                 private route: ActivatedRoute,
                 private router: Router){}

    ngOnInit(){
        // It's called when the route has been resolved and matches with this component
        // Here we can use ActivatedRoute

        // Initialize sectionsTabs array
        this.sectionsTabs = [
                {
                    heading: 'Explicación', 
                    active: true
                },
                {
                    heading: 'Ejemplo', 
                    active: false
                },
                {
                    heading: 'Ejercicios', 
                    active: false
                }
            ];

        /**
         * General Notes:
         *     - (+) converts string 'id' to a number
         *     - This is the observable params approach. Stick with it if there's even a chance that we might 
         *     navigate to this component multiple times in a row. (we retrieve the route params from an Observable. 
         *     That implies that the route params can change during the lifetime of this component) Eg. Changing the 
         *     lesson view is going to be faster because we'll reuse the same component instance, just change the data 
         *     inside of it.
         */

        this.paramsSub = this.route.params
            .switchMap((params: Params) => {
                    this.id_unit = +params['id_unit'];
                    this.id_lesson = +params['id_lesson'];
                    return this._unitsService.getLesson(this.id_unit,this.id_lesson);
                })
            .subscribe(
                lesson    => this.lesson = lesson,        // Happy path
                error     => console.log('error mija'),   // Error path
                ()        => console.log('onComplete')    // onComplete
            );
    }

    /*goToUnitsList(){
        let unitId = this.unit ? this.unit._id : null;
         
        // * Pass along the unit _id if available, so that the unitList component can highlight that unit.
        // * The optional route parameters are not separated by "?" and "&" as they would be in the URL query string. 
        // * They are separated by semicolons ";" This is matrix URL notation
         
        let link = ['/content',{id: unitId, foo: 'fooExampleIgnored'}];
        this.router.navigate(link);
    }*/

    /*saveUnitDetails(){
        console.log('saveUnitDetails called');
        this._unitsService
            .save(this.unit)
            .subscribe( (r:Response) => {
                console.log('success! unit saved');
            });
    }*/

    ngAfterViewInit() {
        // At this point in time the DOM of your component is complete
        /*this.editor = new MyEditor("editor");
        this.editor.InitializeEditor();
        console.log('example editor ready');

        this.editor_exercise1 = new MyEditor("editor-exercise1");
        this.editor_exercise1.InitializeEditor();
        console.log('exercise-1 editor ready');    

        var btn_run_code = document.getElementById('btn-run-code');
        btn_run_code.addEventListener('click',()=>{
            console.log(this.editor.editor.getValue());
        }); */

        /*
        $(function(e:any) {
          e.preventDefault;
          
          // initialize carousel in the lower input / popover (html is inside js)  
          $('.tips-tab').popover({
            html: true,
            trigger: "click",
            placement: "top",
            content: "" +
              '<div id="tips-carousel" class="carousel slide" data-interval="true">' +
              '<!-- Indicators -->' +
                  '<div class="carousel-inner">' +
                      '<div class="item active">' +
                          '<p><img src="dist/assets/img/bulb.svg" alt="">1st Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
                      '</div>' +
                      '<div class="item">' +
                          '<p><img src="dist/assets/img/bulb.svg" alt="">2nd Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
                      '</div>' +
                      '<div class="item">' +
                          '<p><img src="dist/assets/img/bulb.svg" alt="">3rd Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
                      '</div>' +
                  '</div>' +
                  '<!-- Close x -->' +
                  '<a class="close-window-x" href="#"></a>' +
                  '<!-- Controls -->' +
                  '<a class="left carousel-control" href="#tips-carousel" data-slide="prev">' +
                      '<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>' +
                  '</a>' +
                  '<a class="right carousel-control" href="#tips-carousel" data-slide="next">' +
                      '<i class="fa fa-chevron-circle-right"></i>' +
                  '</a>' +
              '</div>' +
              '<!-- End Carousel -->'
          });

          // initialize carousel in the lower input / popover 
          $('.tips-tab').on('shown.bs.popover', function() {
            $('#tips-carousel').carousel({
              interval: 0  //this had 2000 at the beginning
            });
          });

          // close previously opened popovers by clicking outside them
          $(document).on('click', function(e:any) {
            $('a').each(function() {
              if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
              }
            });
          });  

        });
        */

    }


    continueSectionButton(currentSection, currentExercise?){
        var sections:string [];
        sections = ['explanation','example','exercises'];

        var index:number;
        index = sections.indexOf(currentSection);

        //remove active class to current section tab and pane
        var currSectionTab = document.getElementById(sections[index]+'-tab');
        currSectionTab.classList.remove('active');

        var currSectionPane = document.getElementById(sections[index]+'-pane');
        currSectionPane.classList.remove('active');

        //add active class to next section tab and pane
        var nxtSectionTab = document.getElementById(sections[index+1]+'-tab');
        nxtSectionTab.classList.add('active');

        var nxtSectionPane = document.getElementById(sections[index+1]+'-pane');
        nxtSectionPane.classList.add('active');

    }

    /**
     * On Destroy component
     */
    ngOnDestroy(){
        this.paramsSub.unsubscribe();
    }
}