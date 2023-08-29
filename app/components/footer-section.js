import Vue from 'vue';

var footerSection = Vue.extend( {
	template: '#footer-section',
	props: ['language'],
	data: function() {
		return {
			link: '',
			english: {
				link: '/disclaimer'
			},

			spanish: {
				link: '/disclaimer?lang=es'
			}
		}
	},

	created: function() {
		//update language
		if (this.language === 'spanish') {
			this.link = this.spanish.link
		} else {
			this.link = this.english.link
		}
	}
} )

export default footerSection;
