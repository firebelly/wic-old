import $ from 'jquery'
import jQuery from 'jquery';


const views = [ document.getElementsByClassName('listViewSection')[0], document.getElementsByClassName('mapViewSection')[0] ]

function addDropdowns() {
	const dropdowns = document.querySelectorAll('.infoSection_item');
	[...dropdowns].forEach(function(dropdown){
		dropdown.addEventListener('click', function(){
			if ( dropdown.classList.contains('expanded' ) ) {
				dropdown.classList.remove( 'expanded' );
			} else {
				dropdown.classList.add( 'expanded' );
			}
		})
	});
}




function activeTabs(){
	const tabs = document.querySelectorAll('.tabSelector li');

	[...tabs].forEach(function(tab){

		tab.addEventListener('click', function(){

			[...tabs].forEach(function(tab){
				tab.classList.remove('active');
			})

			tab.classList.add('active')

			if ( tab.classList.contains( 'listView' ) ) {
				views[0].classList.add('active')
				views[1].classList.remove('active')
			} else {
				views[0].classList.remove('active')
				views[1].classList.add('active');

				//trigger update to render map
				window.dispatchEvent(new Event('resize'));
			}

		})

	})
}



const onLoad = function() {
	document.addEventListener( 'DOMContentLoaded', function( event ) {
		addDropdowns();
		activeTabs();
	} )
};

(function( $ ) {
    "use strict";

    $(document).ready(function() {
		var reverse = $('.sticky-footer').innerHeight();
		$('.sticky-footer').css('bottom', -reverse);
		$('.sticky-footer').css('transition', '.2s all')

		$('#input-btn').on('click', footerOnClick);
		$( window ).on("scroll", scrollFooter);

		$('.formSection_submit').on('click', function() {
			if ($('.app_content').css('display') === 'none') {
				$(this).toggleClass('active-map');
				var targetEle = $('#map-field').offset();
				var eleOffsetTop = targetEle.top;
			
				$('html, body').animate({
					scrollTop: eleOffsetTop 
				}, 2000);
			}
		});

		$('#input-btn').on('click', function() {
			if ($('.formSection_submit').css('display') === 'none') {
				$(this).toggleClass('active-map');
			}
		});

		setInterval(() => {
			if ( $('.formSection_submit').hasClass('active-map')) {
				var reverse = $('.sticky-footer').innerHeight();
				$('.sticky-footer').css('bottom', -reverse);
			}
		}, 50);
	});

	function footerOnClick() {
		var value = $('#input-sec input').val();
		$('.formSection_input').val(value);
		setTimeout(() => {$('.formSection_submit').click();}, 20);
		var targetEle = $('#map-field').offset();
		var eleOffsetTop = targetEle.top;
	  
		$('html, body').animate({
			scrollTop: eleOffsetTop 
		}, 2000);
		
	}

	function scrollFooter() {
		var titleEle = $('#scroll-sec').offset();
		var titleEleOff = (titleEle.top/2);

		//alert(titleEleOff + ' and ' + $(window).scrollTop());
		if(($(window).scrollTop() >= titleEleOff) && (!$('.formSection_submit').hasClass('active-map'))) {
			$('.sticky-footer').css('bottom', 0);
		}

		if(($(window).scrollTop() < titleEleOff)) {
			var reverse = $('.sticky-footer').innerHeight();
			$('.sticky-footer').css('bottom', -reverse);
			
		} 

		if ($('.sticky-footer').css('bottom') === -reverse ) {
			$('footer').css('margin-bottom', '0px');
			//console.log($('footer').css('margin-bottom'));
		} else {
			$('footer').css('margin-bottom', reverse);
			//console.log($('footer').css('margin-bottom'));
		}

		if ($('.formSection_submit').hasClass('active-map')) {
			$('footer').css('margin-bottom', 0);
		}
	}
	
})(jQuery);


export default onLoad;
