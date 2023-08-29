import Vue from 'vue';
import $ from 'jquery';

// var messageSection = Vue.extend( {
// 	template: '#message-section',
// 	props: ['language'],
// 	data: function() {
// 		return {

// 			title: '',
// 			text: '',

// 			english: {
// 				title: "SAMPLE TITLE",
// 				text: "WIC gives you access to healthy food, nutrition education and breastfeeding guidance. If you’re pregnant, a caregiver, or a mom with a child under 5, you can get the right personalized support for you and your family."
// 			},

// 			spanish: {
// 				title: "Spanish Title",
// 				text:  " WIC te da acceso a alimentos saludables, instrucción sobre nutrición y asesoría sobre lactancia. Si estás embarazada, cuidas a niños o eres mamá de un niño menor de 5 años, puedes recibir apoyo apropiado y personalizado para ti y tu familia."
// 			}
// 		}
// 	},

// 	created: function() {
// 		var language = this.language;
// 		this.title = this[language].title;
// 		this.text = this[language].text;
// 	}
// } )

let messageSection = new Vue({

    // sample vue instance modeled from codepen using ziptastic - do not use for production.
    // either put logic here or in main app js
    
    // el: '#message-section',
    // data: {
    //   city: '',
    //   zip: '',
    //   error: ''
    // },
    // methods: {
    //   getState: function() {
    //     let self = this
    //     // testing an approach done with ziptastic api - should just snag from Google
    //     $.getJSON('https://ZiptasticAPI.com/' + this.zip, function(result) {
    //       if (result.error) {
    //         self.error = 'zip code not found'
    //         self.city = ''
    //       } else {
    //         if (result.state == 'ME') {
    //             self.city = result.city + "," + result.state
                
                
    //         } else {
    //             self.city = result.city + "," + result.state
    //         }
    //       }
    //       console.log(result)
    //     });
    //   }
    // },
    // watch: {
    //   zip: function() {
    //     if (this.zip.length === 5) {
    //       this.getState()
    //       this.error = ''
    //     }
    //     if (this.zip.length < 5) {
    //       this.city = ''
    //       this.error = 'invalid zip code'
    //     }
    //   }
    // }, 
    // created: function(){
    //   this.getState()
    // }
  })

export default messageSection;
