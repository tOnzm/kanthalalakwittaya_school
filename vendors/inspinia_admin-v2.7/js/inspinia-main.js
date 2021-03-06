/*
*
*   INSPINIA - Responsive Admin Theme
*   version 2.7
*
*/

$(document).ready(function () {

  // Add body-small class if window less than 768px
  if ($(this).width() < 769) {
    $('body').addClass('body-small')
  } else {
    $('body').removeClass('body-small')
  }
  
  // Collapse ibox function
  $('.collapse-link').on('click', function () {
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    var content = ibox.children('.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
      ibox.resize();
      ibox.find('[id^=map-]').resize();
    }, 50);
  });

  // Close ibox function
  $('.close-link').on('click', function () {
    var content = $(this).closest('div.ibox');
    content.remove();
  });

  // Fullscreen ibox function
  $('.fullscreen-link').on('click', function () {
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    $('body').toggleClass('fullscreen-ibox-mode');
    button.toggleClass('fa-expand').toggleClass('fa-compress');
    ibox.toggleClass('fullscreen');
    setTimeout(function () {
      $(window).trigger('resize');
    }, 100);
  });

  // Close menu in canvas mode
  $('.close-canvas-menu').on('click', function () {
    $("body").toggleClass("mini-navbar");
    SmoothlyMenu();
  });

  // Open close right sidebar
  $('.right-sidebar-toggle').on('click', function () {
    $('#right-sidebar').toggleClass('sidebar-open');
  });

  // Open close small chat
  $('.open-small-chat').on('click', function () {
    $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
    $('.small-chat-box').toggleClass('active');
  });

  // Small todo handler
  $('.check-link').on('click', function () {
    var button = $(this).find('i');
    var label = $(this).next('span');
    button.toggleClass('fa-check-square').toggleClass('fa-square-o');
    label.toggleClass('todo-completed');
    return false;
  });

  // Minimalize menu
  $('.navbar-minimalize').on('click', function () {
    $("body").toggleClass("mini-navbar");
    SmoothlyMenu();
  });

  // Tooltips demo
  $('.tooltip-demo').tooltip({
    selector: "[data-toggle=tooltip]",
    container: "body"
  });

  $("[data-toggle=popover]") .popover();

});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
  if ($(this).width() < 769) {
    $('body').addClass('body-small')
  } else {
    $('body').removeClass('body-small')
  }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
  if (localStorageSupport()) {

    var collapse = localStorage.getItem("collapse_menu");
    var fixedsidebar = localStorage.getItem("fixedsidebar");
    var fixednavbar = localStorage.getItem("fixednavbar");
    var boxedlayout = localStorage.getItem("boxedlayout");
    var fixedfooter = localStorage.getItem("fixedfooter");

    var body = $('body');

    if (fixedsidebar == 'on') {
      body.addClass('fixed-sidebar');
    }

    if (collapse == 'on') {
      if (body.hasClass('fixed-sidebar')) {
        if (!body.hasClass('body-small')) {
          body.addClass('mini-navbar');
        }
      } else {
        if (!body.hasClass('body-small')) {
          body.addClass('mini-navbar');
        }

      }
    }

    if (fixednavbar == 'on') {
      $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
      body.addClass('fixed-nav');
    }

    if (boxedlayout == 'on') {
      body.addClass('boxed-layout');
    }

    if (fixedfooter == 'on') {
      $(".footer").addClass('fixed');
    }
  }
});

// check if browser support HTML5 local storage
function localStorageSupport() {
  return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
  element = $(element);
  element.hover( function () {
    element.addClass('animated ' + animation);
  },
  function () {
    window.setTimeout(function () { element.removeClass('animated ' + animation); }, 2000);
  });
}

function SmoothlyMenu() {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    $('#side-menu').hide();
    setTimeout( function () { $('#side-menu').fadeIn(400); }, 200);
  }
  else if ($('body').hasClass('fixed-sidebar')) {
    $('#side-menu').hide();
    setTimeout( function () { $('#side-menu').fadeIn(400); }, 100);
  }
  else {
    $('#side-menu').removeAttr('style');
  }
}

// Dragable panels
function WinMove() {
  var element = "[class*=col]";
  var handle = ".ibox-title";
  var connect = "[class*=col]";
  $(element).sortable({
      handle: handle,
      connectWith: connect,
      tolerance: 'pointer',
      forcePlaceholderSize: true,
      opacity: 0.8
    }).disableSelection();
  }
