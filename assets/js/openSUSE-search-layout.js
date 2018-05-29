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


//*****************init i18n

var lang = new Lang('en');
//languages setup - please list here all new language packs
window.lang.dynamic('ar', 'assets/js/langpack/ar.json');
window.lang.dynamic('ast', 'assets/js/langpack/ast.json');
window.lang.dynamic('bg', 'assets/js/langpack/bg.json');
window.lang.dynamic('ca', 'assets/js/langpack/ca.json');
window.lang.dynamic('cs', 'assets/js/langpack/cs.json');
window.lang.dynamic('da', 'assets/js/langpack/da.json');
window.lang.dynamic('de', 'assets/js/langpack/de.json');
window.lang.dynamic('el', 'assets/js/langpack/el.json');
window.lang.dynamic('es', 'assets/js/langpack/es.json');
window.lang.dynamic('fa', 'assets/js/langpack/fa.json');
window.lang.dynamic('fi', 'assets/js/langpack/fi.json');
window.lang.dynamic('fr', 'assets/js/langpack/fr.json');
window.lang.dynamic('gl', 'assets/js/langpack/gl.json');
window.lang.dynamic('hi', 'assets/js/langpack/hi.json');
window.lang.dynamic('id', 'assets/js/langpack/id.json');
window.lang.dynamic('it', 'assets/js/langpack/it.json');
window.lang.dynamic('ja', 'assets/js/langpack/ja.json');
window.lang.dynamic('ko', 'assets/js/langpack/ko.json');
window.lang.dynamic('lt', 'assets/js/langpack/lt.json');
window.lang.dynamic('nl', 'assets/js/langpack/nl.json');
window.lang.dynamic('nn', 'assets/js/langpack/nn.json');
window.lang.dynamic('pl', 'assets/js/langpack/pl.json');
window.lang.dynamic('pt', 'assets/js/langpack/pt.json');
window.lang.dynamic('pt_BR', 'assets/js/langpack/pt_BR.json');
window.lang.dynamic('ru', 'assets/js/langpack/ru.json');
window.lang.dynamic('sk', 'assets/js/langpack/sk.json');
window.lang.dynamic('sv', 'assets/js/langpack/sv.json');
window.lang.dynamic('uk', 'assets/js/langpack/uk.json');
window.lang.dynamic('zh_CN', 'assets/js/langpack/zh_CN.json');
window.lang.dynamic('zh_TW', 'assets/js/langpack/zh_TW.json');

//change language on click
$(document).on("click", ".change-language", function() {
  var languageSelected = $(this).data('language-value');
  var languageString = $(this).html();
  $("body").fadeOut(300, function() {
    window.lang.change(languageSelected);
    $(".selected-language").html(languageString);
    $(this).fadeIn(300);
  });

  return false;
})

//check if there is a langCookie in the browser
$(document).on("ready", function(){

  var languageCode;
  var selectedLanguageName;

  if (cookieLanguage === undefined) {
    try {
      // try to use navigator.language
      languageCode = navigator.language.replace("-","_");
      window.lang.change(languageCode);
    }
    catch(err) {
      // navigator.language is not available
      if (navigator.language.length > 2) {
        try {
          // try with a more general string (for example, if navigator.language is "es-ES" then "es" is tried)
          languageCode = navigator.language.substring(0,2);
          window.lang.change(languageCode);
        }
        catch(err) {
          languageCode = "en";
        }
      }
      else {
        languageCode = "en";
      }
    }
  }
  else {
    languageCode = cookieLanguage;
  }

  selectedLanguageName = $(".languages").find("[data-language-value='" + languageCode + "']").html();
  $(".selected-language").html(selectedLanguageName);
});

//*****************
