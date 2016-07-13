/// <reference path="../../typings/globals/jquery/index.d.ts" />;
/// <reference path="../../typings/globals/bootstrap/index.d.ts" />;

$(function(e:any) {
  // e.preventDefault;
  
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
