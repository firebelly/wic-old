import Vue from 'vue';

var single = Vue.extend({

	template: '#single',
	props: ['office', 'index', 'language'],
	data: function(){
		return {
			english: {
				directionButton: 'Get Directions',
			},

			spanish: {
				directionButton: 'Cómo llegar',
			}
		};
	},

	methods: {
		setActive() {
			this.office.active = true;
			this.dispatchActive();
			this.dispatchUpdate();
		},

		dispatchActive() {
			// sending data to app
			this.$dispatch('updateActive', this.office);
		},

		dispatchUpdate() {
			// sending data to app
			this.$dispatch('triggerMap', this.office);
		}
	},
	created: function() {
		var language = this.language;
		this.directionButton = this[language].directionButton
	}

})

export default single;