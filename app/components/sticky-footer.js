import Vue from 'vue';

var stickyFooter = Vue.extend( {
	template: '#sticky-footer',
	props: ['language'],
	data: function() {
		return {
			title: '',
			input_lang: '',
			cta: '',

			english: {
				input_lang: `<input type="text" placeholder="Enter Zipcode or Address" />`,
				cta: 'Find Locations',
			},

			
			spanish: {
				input_lang: `<input type="text" placeholder="Escribe tu código postal" />`,
				cta: 'Encuentra oficinas',
			},
		}
	},

	created: function() {
		var language = this.language;
		this.input_lang = this[language].input_lang;
		this.cta = this[language].cta;
	}
} )

export default stickyFooter;
