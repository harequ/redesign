var $ = require('jquery');

$(function() {

	/*
	=============================================
	=== Intro page
	=============================================
	*/

	var fadeStart = 0, // 100px scroll or less will equiv to 1 opacity
		fadeUntil = 400, // 400px scroll or more will equiv to 0 opacity
		appearStart = 800, // 400px scroll or more will equiv to 0 opacity
		hero = $('.hero'),
		branches = $('.branches'),
		snow = $('.snow'),
		threeCircles = $('#intro dl'),
		heightOfIntro = $('header').height(),
		nav = $('#nav'),
		navOffset = $('#nav').offset().top;

		nav.wrap('<div class="nav-placeholder"></div>');
		$('.nav-placeholder').height(nav.outerHeight());
		

	$(window).scroll(function() {

		var offset = $(this).scrollTop();

		if(offset >= navOffset) {
			nav.addClass('fixed');
		} else {
			nav.removeClass('fixed');
		}

		if(offset <= heightOfIntro) {
			branches.css({
				'transform' : 'translate(0px, '+ offset / 3.8 +'%)'
			});

			snow.css({
				'transform' : 'translate(0px, '+ offset / 400 +'%)'
			});
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