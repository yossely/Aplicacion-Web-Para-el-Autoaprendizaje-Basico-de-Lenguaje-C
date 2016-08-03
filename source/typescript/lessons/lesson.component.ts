import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router} from '@angular/router';
import { MyEditor } from '../editor';
import { Lesson } from '../data_structure/lesson';
import { UnitsService } from '../units/units.service';

@Component({
	styleUrls: ['dist/assets/css/styles.css'],
    templateUrl: 'dist/assets/partials/main.html',
    providers: [UnitsService],
    directives: [ROUTER_DIRECTIVES]
})

export class LessonComponent implements OnInit, OnDestroy, AfterViewInit{

	editor: MyEditor;
	editor_exercise1: MyEditor;

  	private sub: any;
  	private id_unit: number;
	private id_lesson: number;
  	private lesson: Lesson;

	constructor(private activatedRoute: ActivatedRoute, 
				private router: Router,
				private unitsService: UnitsService){
	}	

	ngOnInit() {
		// It's called when the route has been resolved and matches with this component
		// Here we can use ActivatedRoute

        this.sub = this.activatedRoute.params.subscribe(params => {
        	this.id_unit = +params['id_unit']; 
			this.id_lesson = +params['id_lesson']; 
			
			console.log('Unidad '+this.id_unit+' Leccion '+this.id_lesson);
	
	     	this.unitsService.getLesson(this.id_unit,this.id_lesson)
	        	.subscribe(
	        		result => {
	        			this.lesson = result;
	        			console.log('Lesson ready');
	        			console.log(this.lesson);
	        		}
	    		);
     	});
  	}

  	ngOnDestroy() {
  		this.sub.unsubscribe();
  	}

	ngAfterViewInit() {
    	// At this point in time the DOM of your component is complete
	    this.editor = new MyEditor("editor");
	    this.editor.InitializeEditor();
	    console.log('example editor ready');

	    this.editor_exercise1 = new MyEditor("editor-exercise1");
	    this.editor_exercise1.InitializeEditor();
	    console.log('exercise-1 editor ready');	

	    var btn_run_code = document.getElementById('btn-run-code');
		btn_run_code.addEventListener('click',()=>{
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

  	nextExplanation(index){
  		var ExpId: number;
  		ExpId = +index;

  		// current Explanation
  		var currExp = document.getElementById("explanation-"+ExpId);
  		currExp.style.display = 'none';

  		// next Explanation
  		ExpId++;
  		var nxtExp = document.getElementById("explanation-"+ExpId);
  		nxtExp.style.display = 'block';
  	}

  	previousExplanation(index){
  		var ExpId: number;
  		ExpId = +index;

  		// current Explanation
  		var currExp = document.getElementById("explanation-"+ExpId);
  		currExp.style.display = 'none';

  		// Previous Explanation
  		ExpId--;
  		var nxtExp = document.getElementById("explanation-"+ExpId);
  		nxtExp.style.display = 'block';
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

}