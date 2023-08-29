import Vue from 'vue';

var landingSection = Vue.extend( {
	template: '#landing-section',
	props: ['language'],
	data: function() {
		return {

			title: '',
			p_1: '',
			p_2: '',

			english: {
				title: "All Caregivers Are Welcome",
				p_1: "WIC gives you access to healthy food, nutrition education and breastfeeding guidance. If you’re pregnant, a caregiver, or a mom with a child under 5, you can get the right personalized support for you and your family.",
				p_2: "Caregivers with a low to medium income and those who are part of other programs such as foster care, medical assistance, or SNAP are eligible. Use our location finder below to contact your local office for details."
			},

			spanish: {
				title: "TODOS LOS CUIDADORES SON BIENVENIDOS ",
				p_1:  "Si estás embarazada, eres mamá, papá, padrastro, madrastra, padre/madre adoptivo o tutor con un hijo/a menor de 5 años, puedes recibir el apoyo personalizado adecuado para ti y tu familia",
				p_2: "Los cuidadores de ingresos bajos a medios y aquellos que forman parte de otros programas como cuidado tutelar, asistencia médica o SNAP (programa de asistencia de nutrición suplementaria) son elegibles. Utiliza nuestro buscador de ubicación más abajo para contactar a tu oficina local y obtener más información. "
			}
		}
	},

	created: function() {
		var language = this.language;
		this.title = this[language].title;
		this.p_1 = this[language].p_1;
		this.p_2 = this[language].p_2;
	}
} )

export default landingSection;
