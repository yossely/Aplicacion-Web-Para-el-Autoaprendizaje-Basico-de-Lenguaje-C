"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const editor_1 = require('../editor');
const units_service_1 = require('../units/units.service');
let LessonComponent = class LessonComponent {
    constructor(activatedRoute, router, unitsService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.unitsService = unitsService;
    }
    ngOnInit() {
        // It's called when the route has been resolved and matches with this component
        // Here we can use ActivatedRoute
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id_unit = +params['id_unit'];
            this.id_lesson = +params['id_lesson'];
            console.log('Unidad ' + this.id_unit + ' Leccion ' + this.id_lesson);
            this.unitsService.getLesson(this.id_unit, this.id_lesson)
                .subscribe(result => {
                this.lesson = result;
                console.log('Lesson ready');
                console.log(this.lesson);
            });
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    ngAfterViewInit() {
        // At this point in time the DOM of your component is complete
        this.editor = new editor_1.MyEditor("editor");
        this.editor.InitializeEditor();
        console.log('example editor ready');
        this.editor_exercise1 = new editor_1.MyEditor("editor-exercise1");
        this.editor_exercise1.InitializeEditor();
        console.log('exercise-1 editor ready');
        var btn_run_code = document.getElementById('btn-run-code');
        btn_run_code.addEventListener('click', () => {
            console.log(this.editor.editor.getValue());
        });
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
    nextExplanation(index) {
        var ExpId;
        ExpId = +index;
        // current Explanation
        var currExp = document.getElementById("explanation-" + ExpId);
        currExp.style.display = 'none';
        // next Explanation
        ExpId++;
        var nxtExp = document.getElementById("explanation-" + ExpId);
        nxtExp.style.display = 'block';
    }
    previousExplanation(index) {
        var ExpId;
        ExpId = +index;
        // current Explanation
        var currExp = document.getElementById("explanation-" + ExpId);
        currExp.style.display = 'none';
        // Previous Explanation
        ExpId--;
        var nxtExp = document.getElementById("explanation-" + ExpId);
        nxtExp.style.display = 'block';
    }
    continueSectionButton(currentSection, currentExercise) {
        var sections;
        sections = ['explanation', 'example', 'exercises'];
        var index;
        index = sections.indexOf(currentSection);
        //remove active class to current section tab and pane
        var currSectionTab = document.getElementById(sections[index] + '-tab');
        currSectionTab.classList.remove('active');
        var currSectionPane = document.getElementById(sections[index] + '-pane');
        currSectionPane.classList.remove('active');
        //add active class to next section tab and pane
        var nxtSectionTab = document.getElementById(sections[index + 1] + '-tab');
        nxtSectionTab.classList.add('active');
        var nxtSectionPane = document.getElementById(sections[index + 1] + '-pane');
        nxtSectionPane.classList.add('active');
    }
};
LessonComponent = __decorate([
    core_1.Component({
        styleUrls: ['dist/assets/css/styles.css'],
        templateUrl: 'dist/assets/partials/main.html',
        providers: [units_service_1.UnitsService],
        directives: [router_1.ROUTER_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, units_service_1.UnitsService])
], LessonComponent);
exports.LessonComponent = LessonComponent;

//# sourceMappingURL=../maps/lessons/lesson.component.js.map
