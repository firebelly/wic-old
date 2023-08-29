import Vue from 'vue';

var infoSection = Vue.extend( {
	template: '#info-section',
	props: ['language'],
	data: function() {
		return {

			title: '',
			text: '',
			items: [],

			english: {
				title: "FOOD. EDUCATION. SUPPORT. YOU GOT THIS.",
				text: "We have resources, knowledge, and tools to help you be the mom you want to be.",
				items: [
					{
						img: '/static/img/apple.svg',
						title: 'HEALTHY FOOD',
						list: ['Fresh fruits and vegetables', 'Milk, cheese & more', 'Cereal and other grains', 'Peanut butter, beans & more']
					},
					{
						img: '/static/img/drop.svg',
						title: 'BREASTFEEDING Support',
						list: ['Support and education', 'Peer counseling', 'Lactation support', 'Classes and information']
					},
					{
						img: '/static/img/carrot.svg',
						title: 'NUTRITION EDUCATION',
						list: ['Shopping guidance', 'Prenatal nutrition tips', 'Kid-friendly recipes', 'Personalized nutrition counseling']
					},
					{
						img: '/static/img/heart.svg',
						title: 'CARE BEYOND WIC',
						list: ['Immunization services', 'Substance abuse counseling', 'Domestic abuse counseling', 'Social services']
					}

				],
			},

			spanish: {
				title: "Alimentos. Instrucción. Apoyo. Estás lista.",
				text:  "Tenemos los recursos, conocimientos y herramientas para ayudarte a ser la mamá que quieres ser.",
				items: [
					{
						img: '/static/img/apple.svg',
						title: 'Alimentos saludables',
						list: ['Fruta fresca y vegetales', 'Leche, queso y más', 'Cereal y otros granos', 'Mantequilla de maní, menestras y más']
					},
					{
						img: '/static/img/drop.svg',
						title: 'Apoyo con la lactancia',
						list: ['Apoyo e instrucción', 'Sugerencias de otras mamás', 'Apoyo con la lactancia', 'Clases e información']
					},
					{
						img: '/static/img/carrot.svg',
						title: 'Instrucción sobre nutrición',
						list: ['Asesoría sobre compras', 'Consejos de nutrición prenatal', 'Recetas que les gustan a los niños', 'Asesoría personalizada sobre nutrición']
					},
					{
						img: '/static/img/heart.svg',
						title: 'Atención adicional a WIC',
						list: ['Servicios de inmunización', 'Asesoría en caso de adicción', 'Asesoría en caso de abuso doméstico', 'Servicios sociales']
					}
				]
			}
		}
	},

	created: function() {
		var language = this.language;
		this.title = this[language].title
		this.text = this[language].text
		this.items = this[language].items
	}
} )

export default infoSection;