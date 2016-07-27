import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router} from '@angular/router';
import { MyEditor } from './editor';

@Component({
	styleUrls: ['dist/assets/css/styles.css'],
    templateUrl: 'dist/assets/partials/main.html',
    directives: [ROUTER_DIRECTIVES]
})

export class LessonComponent implements OnInit, OnDestroy, AfterViewInit{

	editor: MyEditor;
	editor_exercise1: MyEditor;

  	private sub: any;

	constructor(private activatedRoute: ActivatedRoute, private router: Router){

	}	

	ngOnInit() {
		// It's called when the route has been resolved and matches with this component
		// Here we can use ActivatedRoute

        this.sub = this.activatedRoute.params.subscribe(params => {
        	let id_unit = +params['id_unit']; 
			let id_lesson = +params['id_lesson']; 
			console.log(id_unit);
			console.log(id_lesson);
	        /*let id = +params['id']; // (+) converts string 'id' to a number
	        this.service.getHero(id).then(hero => this.hero = hero);*/
     	});
  	}

  	ngOnDestroy() {
  		this.sub.unsubscribe();
  	}

	ngAfterViewInit() {
    	// At this point in time the DOM of your component is complete
	    // console.log('AfterViewInit');
	    this.editor = new MyEditor("editor");
	    this.editor.InitializeEditor();

	    this.editor_exercise1 = new MyEditor("editor-exercise1");
	    this.editor_exercise1.InitializeEditor();
	    

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
		                  '<p><img src="assets/img/bulb.svg" alt="">1st Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
		              '</div>' +
		              '<div class="item">' +
		                  '<p><img src="assets/img/bulb.svg" alt="">2nd Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
		              '</div>' +
		              '<div class="item">' +
		                  '<p><img src="assets/img/bulb.svg" alt="">3rd Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>' +
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


  	}

}