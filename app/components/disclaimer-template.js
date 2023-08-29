import Vue from 'vue';

var disclaimerTemplate = Vue.extend( {
	template: '#disclaimer-section',
	props: ['language'],
	data: function() {
		return {

			bread: '',
			legal_text: '',

			english: {
				bread: `<div class="bread"><a href="/">Home</a> / <p>Disclaimer</p></div>`,
				legal_text: `In accordance with Federal civil rights law and U.S. Department of Agriculture (USDA) civil rights regulations and policies, the USDA, its Agencies, offices, and employees, and institutions participating in or administering USDA programs are prohibited from discriminating based on race, color, national origin, sex, disability, age, or reprisal or retaliation for prior civil rights activity in any program or activity conducted or funded by USDA.
				<br><br>
				Persons with disabilities who require alternative means of communication for program information (e.g. Braille, large print, audiotape, American Sign Language, etc.), should contact the Agency (State or local) where they applied for benefits. Individuals who are deaf, hard of hearing or have speech disabilities may contact USDA through the Federal Relay Service at <a href="tel:+1(800)877-8339">(800) 877-8339</a>. Additionally, program information may be made available in languages other than English.
				<br><br>
				To file a program complaint of discrimination, complete the <a href="https://www.ocio.usda.gov/sites/default/files/docs/2012/Complain_combined_6_8_12.pdf">USDA Program Discrimination Complaint Form</a>, (AD-3027) found online at: <a href="http://www.ascr.usda.gov/complaint_filing_cust.html">http://www.ascr.usda.gov/complaint_filing_cust.html</a>, and at any USDA office, or write a letter addressed to USDA and provide in the letter all of the information requested in the form. To request a copy of the complaint form, call <a href="tel:+1(866) 632-9992">(866) 632-9992</a>. Submit your completed form or letter to USDA by:
				<br><br>
				(1)    mail: U.S. Department of Agriculture
				Office of the Assistant Secretary for Civil Rights
				1400 Independence Avenue, SW
				Washington, D.C. 20250-9410;
				<br>
				(2)    fax: <a href="tel:2026907442">(202) 690-7442</a>; or
				<br>
				(3)    email: <a href="mailto:program.intake@usda.gov">program.intake@usda.gov</a>.

				This institution is an equal opportunity provider.
				<br><br>
				<a href="/">Back To Home</a> `,
			},

			spanish: {
				bread: `<div class="bread"><a href="/?lang=es">Página de inicio</a> / <p>Descargo de responsabilidad</p></div>`,
				legal_text: `De conformidad con la Ley Federal de Derechos Civiles y los reglamentos y políticas de derechos civiles del Departamento de Agricultura de los EE. UU. (USDA, por sus siglas en inglés), se prohíbe que el USDA, sus agencias, oficinas, empleados e instituciones que participan o administran programas del USDA discriminen sobre la base de raza, color, nacionalidad, sexo, credo religioso, discapacidad, edad, creencias políticas, o en represalia o venganza por actividades previas de derechos civiles en algún programa o actividad realizados o financiados por el USDA.
				<br><br>
				Las personas con discapacidades que necesiten medios alternativos para la comunicación de la información del programa (por ejemplo, sistema Braille, letras grandes, cintas de audio, lenguaje de señas americano, etc.), deben ponerse en contacto con la agencia (estatal o local) en la que solicitaron los beneficios. Las personas sordas, con dificultades de audición o con discapacidades del habla pueden comunicarse con el USDA por medio del Federal Relay Service [Servicio Federal de Retransmisión] llamando al (800) 877-8339. Además, la información del programa se puede proporcionar en otros idiomas.
				<br><br>
				Para presentar una denuncia de discriminación, complete el Formulario de Denuncia de Discriminación del Programa del USDA, (AD-3027) que está disponible en línea en: http://www.ascr.usda.gov/complaint_filing_cust.html y en cualquier oficina del USDA, o bien escriba una carta dirigida al USDA e incluya en la carta toda la información solicitada en el formulario. Para solicitar una copia del formulario de denuncia, llame al (866) 632-9992. Haga llegar su formulario lleno o carta al USDA por:
				<br><br>

				(1)    correo: U.S. Department of Agriculture Office of the Assistant Secretary for Civil Rights
				1400 Independence Avenue, SW
				Washington, D.C. 20250-9410;
				 <br>
				(2) fax: (202) 690-7442; o
				<br>
				(3) correo electrónico: <a href="mailto:program.intake@usda.gov">program.intake@usda.gov</a>.
				 <br>

				Esta institución es un proveedor que ofrece igualdad de oportunidades.
				<br><br>
				<a href="/?lang=es">Vuelta a casa</a>`,
			}
		}
	},

	created: function() {
		var language = this.language;
		this.bread = this[language].bread;
		this.legal_text = this[language].legal_text;

	}
} )

export default disclaimerTemplate;
