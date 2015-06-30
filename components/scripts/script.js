$(function() {

	var fadeStart = 0,
		fadeUntil = 400,
		appearStart = 400,
		hero = $('.hero'),
		branches = $('.branches'),
		snow = $('.snow'),
		threeCircles = $('#intro dl'),
		nav = $('#nav'),
		navOffset = $('#nav').offset().top,
		navHeight = nav.outerHeight(),
		pull = $('#pull'),
		menu = $('#nav .navbar'),
		menuHeight = menu.height();

	// Smooth scrolling
	$(".scroll").click(function(event) {
	    event.preventDefault();
	    $('html, body').animate({ scrollTop : $(this.hash).offset().top - navHeight +1 } , 700);
    });

	// Scrolling events
	$(window).scroll(function() {
		var offset = $(this).scrollTop(),
			heightOfIntro = $('header').height(),
	    	opacity = 0,
	    	opacity2 = 1;

	    // Parallax effect for branches and snow
		if(offset <= heightOfIntro) {
			branches.css({ 'transform' : 'translate(0px, '+ offset / 3.8 +'%)' });
			snow.css({ 'transform' : 'translate(0px, ' + offset * 1.2 +'px)' });
		}

		// Fade in and Fade out effect for herotext and threeCircles
	    if(offset <= fadeStart) {
	        opacity = 1;
	        opacity2 = 0;
	    } else if( offset <= fadeUntil ){
	        opacity = 1 - offset/fadeUntil;
	        opacity2 = offset/fadeUntil;
	    }

	    hero.css('opacity', opacity);
	    threeCircles.css('opacity', opacity2);

	    // Highlighting active nav menu items
	    var windowPos = offset + navHeight;

	    $('.navbar li a').removeClass('active');

	    if(windowPos > $('#work').offset().top) {
		    $('.navbar li a').removeClass('active');
		    $('a[href$="#work"]').addClass('active');
	    }

	    if(windowPos > $('#design').offset().top) {
		    $('.navbar li a').removeClass('active');
		    $('a[href$="#design"]').addClass('active');
	    }

	    if(windowPos > $('#skills').offset().top) {
		    $('.navbar li a').removeClass('active');
		    $('a[href$="#skills"]').addClass('active');
	    }

	    if(windowPos > $('footer').offset().top) {
		    $('.navbar li a').removeClass('active');
		    $('a[href$="#contact"]').addClass('active');
	    }
	});

	// When clicking on Menu button, it toggles the menu
	$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	// When menu is opened (in mobile version), slideup the menu when clicking anywhere outside
	$(document).on('click', function(event) {
		if (!$(event.target).closest(pull).length && pull.is(':visible') && menu.is(':visible')) {
			menu.slideUp();
		}
	});

    // Remove style attribute (display:block; or display:none;) when resize the window
	$(window).resize(function() {
		menu.removeAttr('style');	
	});

	/*
	=============================================
	=== Carousel
	=============================================
	*/

	$('.carousel').slick({
		dots: true,
		autoplay: true,
  		autoplaySpeed: 5000
	});

	/*
	=============================================
	=== Sticky nav 
	=============================================
	*/
	var sticky = new Waypoint.Sticky({
	  element: $(nav)
	});

	/*
	=============================================
	=== IE Fix for "jumpy" fixed background
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
	=== Trigger for skills graph animation
	=============================================
	*/
	var html = $('#html'),
		css = $('#css'),
		javascript = $('#javascript'),
		php = $('#php'),
		wordpress = $('#wordpress'),
		mysql = $('#mysql');

	$('.skillz').waypoint(function(direction) {
		if(direction == 'down') {
			html.addClass('html');
			css.addClass('css');
			javascript.addClass('javascript');
			php.addClass('php');
			wordpress.addClass('wordpress');
			mysql.addClass('mysql');
		} else {
			html.removeClass('html');
			css.removeClass('css');
			javascript.removeClass('javascript');
			php.removeClass('php');
			wordpress.removeClass('wordpress');
			mysql.removeClass('mysql');
		}
	}, {offset : '95%'});

	/*
	=============================================
	=== Modal overlay window (submit form) 
	=============================================
	*/
	$('.email').click(function() {
		$('.overlay').addClass('show-modal');
		return false;
	});

	$('.close-btn').click(function() {
		$('.overlay').removeClass('show-modal');
	});

	$('.overlay').click(function(event) {
		if(event.target == this) {
			$('.overlay').removeClass('show-modal');
		}
	});


});