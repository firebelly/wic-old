import Vue from 'vue';


var mapContext;
var infowindow;
var markers = [];

var map = Vue.extend({
	////////////////////////////////////////////////////////////////////////
	// init
	////////////////////////////////////////////////////////////////////////
	template: '#map',
	props: ['language'],
	data: function(){
		return {
			map: undefined
		}
	},

	////////////////////////////////////////////////////////////////////////
	// events
	////////////////////////////////////////////////////////////////////////
	events: {
		setMap( offices ) {
			renderMap( offices, this.language );
			makeOpen( offices[0], this.language )
		},

		updateMap( office ) {
			var center = new google.maps.LatLng(office.latitude, office.longitude);
			mapContext.panTo(center);
			makeOpen( office, this.language )
		}
	}

});

let renderMap = function( offices, language ) {


	var ctaLanguage = 'Get Directions';

	if ( language === 'spanish' ) {
		ctaLanguage = 'Cómo llegar'
	}

	let intialItem = offices[0];

	let options = {
		zoom: 18,
		center: new google.maps.LatLng(intialItem.latitude, intialItem.longitude),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		scrollwheel: false,
	};

	// init map
	mapContext = new google.maps.Map(document.getElementById('mapCanvas'), options);

	//create markers
	infowindow = new google.maps.InfoWindow();
	let marker, i;

	for ( i = 0; i < offices.length; i++ ) {
		marker = new google.maps.Marker( {
			position: new google.maps.LatLng( offices[i].latitude, offices[i].longitude ),
			map: mapContext
		});

		google.maps.event.addListener( marker, 'click', ( function( marker, i ) {
			let template = [];

			template.push('<div class="itemInfo_bubble">')
			if (offices[i].location_name) {
				template.push('<p class="itemInfo_title">' + offices[i].location_name + '</p>');
			}
			template.push('<p class="listItem_address">' + offices[i].address_1);
			if (offices[i].address_2) {
				template.push('<br>' + offices[i].address_2);
			}
			template.push('<br>' + offices[i].city + ' ' + offices[i].state + ' ' + offices[i].postal_code);
			template.push('</p>');
			template.push('<p class="listItem_phone">' + offices[i].formattedNumber + '</p>');
			template.push('<a href="http://maps.google.com/?q=' + offices[i].address_1 + '" target="_blank">'+ ctaLanguage +'</a>');
			template.push('</div>');

			markers.push( marker );

			return function() {
				infowindow.setContent( template.join('') );
				infowindow.open( mapContext, marker );
			}

		} )( marker, i ) );
    }
}


var makeOpen = function(office, mapContext, language) {

		// var ctaLanguage = 'getDirections';

		// if ( language === 'spanish' ) {
		// 	ctaLanguage = 'Cómo llegar'
		// }

		// var template = [];

		// template.push('<div class="itemInfo_bubble">')
		// if (office.location_name) {
		// 	template.push('<p class="itemInfo_title">' + office.location_name + '</p>');
		// }
		// template.push('<p class="listItem_address">' + office.address_1);
		// if (office.address_2) {
		// 	template.push('<br>' + office.address_2);
		// }
		// template.push('<br>' + office.city + ' ' + office.state + ' ' + office.postal_code);
		// template.push('</p>');
		// template.push('<p class="listItem_phone">' + office.formattedNumber + '</p>');
		// template.push('<a href="http://maps.google.com/?q=' + office[i].address_1 + '" target="_blank">'+ ctaLanguage +'</a>');
		// template.push('</div>');

		// infowindow.setContent( template.join('') );
		// infowindow.open( mapContext, markers[office.key] );
}


export default map;
