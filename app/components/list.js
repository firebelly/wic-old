import Vue from 'vue';

// nested component
import single from './single';

var list = Vue.extend({
	////////////////////////////////////////////////////////////////////////
	// init
	////////////////////////////////////////////////////////////////////////
	template: '#list',
	props: ['offices', 'language'],
	data: function(){
		return {
			visible: true
		}
	},

	components: {
		single: single
	},

	////////////////////////////////////////////////////////////////////////
	// events
	////////////////////////////////////////////////////////////////////////
	events: {
		updateActive( activeOffice ) {

			this.offices.map( item => item.active = false )
			activeOffice.active = true
			this.$dispatch( 'updateMapTrigger', activeOffice )
		}
	}

});

export default list