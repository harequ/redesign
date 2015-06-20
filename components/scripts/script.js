$(function() {
	
	/*
	=============================================
	=== IE Fix for "jumpy" fixed bacground
	=============================================
	*/
	if(navigator.userAgent.match(/Trident\/7\./)) {
        $('body').on("mousewheel", function () {

            event.preventDefault();
            var wheelDelta = event.wheelDelta;

            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
	}
	/*
	=============================================
	=== Intro page
	=============================================
	*/

	var fadeStart = 0, // 100px scroll or less will equiv to 1 opacity
		fadeUntil = 400, // 400px scroll or more will equiv to 0 opacity
		appearStart = 400, // 400px scroll or more will equiv to 0 opacity
		hero = $('.hero'),
		branches = $('.branches'),
		snow = $('.snow'),
		threeCircles = $('#intro dl'),
		nav = $('#nav'),
		navOffset = $('#nav').offset().top,
		navHeight = nav.outerHeight();
		nav.wrap('<div class="nav-placeholder"></div>');
	
	/*
	=============================================
	=== Smooth scrolling
	=============================================
	*/

	$(".scroll").click(function(event) {
	    event.preventDefault();
	    $('html, body').animate({ scrollTop : $(this.hash).offset().top - navHeight } , 700);
    });

	$(window).scroll(function() {
		var offset = $(this).scrollTop();
		var heightOfIntro = $('header').height();

		if(offset >= navOffset) {
			nav.addClass('fixed');
			$('.nav-placeholder').css('height', navHeight);
		} else {
			nav.removeClass('fixed');
			$('.nav-placeholder').css('height', '');
		}

		if(offset <= heightOfIntro) {
			branches.css({ 'transform' : 'translate(0px, '+ offset / 3.8 +'%)' });
			snow.css({ 'transform' : 'translate(0px, ' + offset * 1.2 +'px)' });
		}

	    var opacity = 0;
	    var opacity2 = 1;

	    if(offset <= fadeStart) {
	        opacity = 1;
	        opacity2 = 0;
	    } else if( offset <= fadeUntil ){
	        opacity = 1 - offset/fadeUntil;
	        opacity2 = offset/fadeUntil;
	    }


	    hero.css('opacity', opacity);
	    threeCircles.css('opacity', opacity2);
	});

	/*
	=============================================
	=== Navigation menu
	=============================================
	*/

	var pull = $('#pull'),
		menu = $('#nav .navbar'),
		menuHeight = menu.height(),
		width = $(window).width();

	// When clicking on Menu button, it toggles the menu
	$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	// When menu is opened (in mobile version), slideup the menu when clicking anywhere outside
	$(document).on('click', function(event) {
	  if (!$(event.target).closest('#pull').length && pull.is(':visible') && menu.is(':visible')) {
		menu.slideUp();
	  }
	});

    // Show the menu if it was hidden when resizing to > 650 
	$(window).resize(function() {
		navOffset = $('#nav').offset().top;

		if(width > 650 && menu.is(':hidden')) {
			menu.removeAttr('style');
		} else if (width < 650 && menu.not(':hidden')) {
			menu.attr('style', ':hidden');
		}
	});
});