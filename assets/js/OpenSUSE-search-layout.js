var screenHeight   = 0
var headerHeight   = 0
var footerHeight   = 0
var sectionHeight  = 0
var remaining      = 0

function getScreenSize () {
  sectionHeight  = $('#search-index section').outerHeight();
  headerHeight   = 50;//$('#search-index header').outerHeight(); => doesnt work correctly in Firefox. Fix and re-aply.
  footerHeight   = 60;//$('#search-index footer').outerHeight(); => doesnt work correctly in Firefox. Fix and re-aply.
  layout_fix();
};

$(window).on("resize", function() {

  layout_fix();

});

function layout_fix () {
  screenHeight = $(window).outerHeight();
  searchFormAndDooel = $(".fixed-column-form").outerHeight();
  remaining    = screenHeight - footerHeight - headerHeight;

  if ( remaining > sectionHeight ) {
    $('#search-index .fixed-column-form').css({
      'padding-top': ((remaining - searchFormAndDooel) / 4) + 'px'
    });
    $('#search-index .container-fluid').css({
      height: remaining + headerHeight + 'px'
    });

  }
}

//smooth page loader.. because the sudden print on screen bothers me a lot
$(document).on("ready", function (){

  var loadingMaringTop = $(window).height() / 2
  $("body").wrapInner( "<div class='opensuse-search-page'></div>");
  $("body").prepend("<div class='opensuse-loading-page'></div>");
  $(".opensuse-loading-page").css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    background: '#fff',
  });
  $(".opensuse-loading-page").prepend("<div class='opensuse-loading-text' lang='en'>Loading Page</div>");
  $(".opensuse-loading-text").css({
    width: '300px',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'text-align': 'center',
    'padding-top': loadingMaringTop + 'px'
  });

  $(".opensuse-search-page").hide();

})

$(window).on("load", function() {

  $(".opensuse-loading-page").fadeOut('600', function() {
    $(".opensuse-search-page").fadeIn();
    $(this).remove();
    getScreenSize();
  });

});
