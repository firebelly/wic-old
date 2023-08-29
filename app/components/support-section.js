import Vue from 'vue';

var supportSection = Vue.extend( {
	template: '#support-section',
	props: ['language'],
	data: function() {
		return {

			title: '',
			text: '',
			items: [],

			english: {
				title: "ALL CAREGIVERS ARE WELCOME.",
				text: "If you're pregnant, a caregiver, or a mom with a child under 5, you can get the right personalized support for you and your family.",
				subtitle: 'HERE’S WHO CAN GET SUPPORT',
				text2: "Caregivers with a low to medium income and those who are part of other programs such as foster care, medical assistance, or SNAP are eligible. Contact your local office for details.",
				items: ['Moms', 'Pregnant women', 'Dads', 'Grandparents', 'Foster parents', 'Step-parents', 'Guardians'],
			},

			spanish: {
				title: "Todos los cuidadores están bienvenidos.",
				text:  "No solo apoyamos a las mamás; apoyamos a todos los que cuidan a niños, sea su trabajo o no.",
				subtitle: 'Pueden recibir apoyo',
				text2: "Pueden participar los cuidadores con bajos o medianos ingresos que son parte de programas como el de padres temporales <em>(foster)</em>, asistencia médica o SNAP. Comunícate con la oficina local para obtener más detalles.",
				items: ['Mamás', 'Embarazadas', 'Papás', 'Abuelos', 'Padres temporales', 'Padrastros', 'Apoderados' ],
			}
		}
	},

	created: function() {
		var language = this.language;
		this.title = this[language].title;
		this.text = this[language].text;
		this.text2 = this[language].text2;
		this.items = this[language].items;
		this.subtitle = this[language].subtitle;
	}
} )

export default supportSection;
