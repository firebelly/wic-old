import Vue from 'vue';

var headerSection = Vue.extend( {
	template: '#header-section',
	props: ['language'],
	data: function() {
		return {
			

			cta: '',
			url: '',

			english: {
				cta: 'En español',
				title: "HEALTHY STARTS HERE",
				url: '?lang=es'
			},

			spanish: {
				cta: 'In English',
				title: "UN COMIENZO SALUDABLE CON WIC",
				url: '?'
			}
		}
	},

	created: function() {
		this.cta = this[this.language].cta
		this.title = this[this.language].title
		this.url = this[this.language].url
	}
} )

export default headerSection;