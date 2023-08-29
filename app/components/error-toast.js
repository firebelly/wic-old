import Vue from 'vue';

var error = Vue.extend( {
	template: '#error',
	props: ['error'],
	data: function() {
		return {visible: true}
	}
} )

export default error;
