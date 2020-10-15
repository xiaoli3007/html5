$(document).ready(function() {
	// 手机导航
	$('.menuBtn').append('<b></b><b></b><b></b>');
	$('.menuBtn').click(function(event) {
	    $(this).toggleClass('open');
	    var _winw = $(window).width();
	    var _winh = $(window).height();
	    if ($(this).hasClass('open')) {
	        $('body').addClass('open');
	        if (_winw <= 1200) {
	            $('.nav').addClass('open');
	        }
	    } else {
	        $('body').removeClass('open');
	        if (_winw <= 1200) {
	            $('.nav').removeClass('open');
	        }
	    }
	});
	$(window).on('resize', function(e) {
	    if ($(window).width() > 1200) {
	        $('.menuBtn').removeClass('open');
	        $('.nav').css('display', '');
	    }
	});
	$(".cont li").click(function() {
		console.log("2334")
	    $('.menuBtn').removeClass('open');
		$('.nav').removeClass('open');
	})
	
	// 导航
	function myNav() {
	    var _winw = $(window).width();
	    if (_winw > 1199) {
	        $('.nav li').bind('mouseenter', function() {
	            $(this).find('dl').stop().slideDown(200);
	            if ($(this).find('dl').length) {
	                $(this).addClass('ok');
	            }
	        });
	        $('.nav li').bind('mouseleave', function() {
	            $(this).removeClass('ok');
	            $(this).find('dl').stop().slideUp(100);
	        });
	        $('body,.menuBtn').removeClass('open');
	    } else {
	        $('.nav .v1').click(function() {
	            $(this).parents(".nav").find("dl").stop().slideUp();
	            if ($(this).siblings('dl').length) {
	                $(this).siblings('dl').stop().slideToggle();
	                return false;
	            }
	        });
	    }
	}
	myNav();
	// $(window).resize(function(event) {
	//     myNav();
	// });
})