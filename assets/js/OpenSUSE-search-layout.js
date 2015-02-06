var screenHeight   = 0
var headerHeight   = 0
var footerHeight   = 0
var sectionHeight  = 0
var remaining      = 0

$(window).on("load", function() {
  sectionHeight  = $('#search-index section').outerHeight();
  headerHeight   = 30;//$('#search-index header').outerHeight(); => doesnt work correctly in Firefox. Fix and re-aply.
  footerHeight   = 90;//$('#search-index footer').outerHeight(); => doesnt work correctly in Firefox. Fix and re-aply.
  layout_fix();

});

$(window).on("resize", function() {

  layout_fix();

});

function layout_fix () {
  screenHeight = $(window).outerHeight();
  remaining    = screenHeight - footerHeight - headerHeight;

  if ( remaining > sectionHeight ) {
    $('#search-index .fixed-column-form').css({
      'padding-top': ((remaining - sectionHeight) / 3) + 'px'
    })
    $('#search-index .container-fluid').css({
      height: remaining + headerHeight + 'px'
    })

  }
}

