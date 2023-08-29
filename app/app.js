import Vue from "vue";
import httpResource from "vue-resource";

import $ from "jquery";

import error from "./components/error-toast";
import map from "./components/map";
import list from "./components/list";

import headerSection from "./components/header-section";
import landingSection from "./components/landing-section";
import infoSection from "./components/info-section";
import supportSection from "./components/support-section";
import footerSection from "./components/footer-section";
import messageSection from "./components/message-section";
import disclaimerTemplate from "./components/disclaimer-template";
import stickyFooter from "./components/sticky-footer";
/*import jquery from 'jquery'*/
import onLoad from "./modules/index";

require("./scss/main.scss");

// add event listeners to the onload function
onLoad();

// add plugins to Vue
Vue.use(httpResource);

// adding components
Vue.component("error", error);
Vue.component("map", map);
Vue.component("list", list);

// adding sections
Vue.component("landing-section", landingSection);
Vue.component("disclaimer-section", disclaimerTemplate);
Vue.component("info-section", infoSection);
Vue.component("support-section", supportSection);
Vue.component("footer-section", footerSection);
Vue.component("header-section", headerSection);
Vue.component("message-section", messageSection);
Vue.component("sticky-footer", stickyFooter);

var App = new Vue({
	////////////////////////////////////////////////////////////////////////
	/// init
	////////////////////////////////////////////////////////////////////////
	el: "#app",
	data: {
		user: {},
		zipcode: "",
		error: "",
		offices: [],
		loaded: "",
		loading: "",
		showMore: false,
		language: "english",

		formText: {
			title: "",
			placeholder: "",
			cta: "",
		},

		spanish: {
			title: "ENCUENTRA UN LOCAL CERCANO.",
			placeholder: "Escribe tu código postal",
			cta: "Encuentra oficinas",
			seeMoreButton: "Más información",
			listHeader: "Llama a una oficina de WIC cerca de",
		},

		english: {
			title: "FIND A LOCATION NEAR YOU.",
			placeholder: "Enter Zipcode or Address",
			cta: "Find Locations",
			seeMoreButton: "See More",
			listHeader: "Call a WIC office near",
		},
	},

	created: function () {
		//update the language paramater
		var urlParams;
		(window.onpopstate = function () {
			var match,
				pl = /\+/g, // Regex for replacing addition symbol with a space
				search = /([^&=]+)=?([^&]*)/g,
				decode = function (s) {
					return decodeURIComponent(s.replace(pl, " "));
				},
				query = window.location.search.substring(1);

			urlParams = {};
			while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
		})();

		// Set Language
		var language = urlParams.lang === "es" ? "spanish" : "english";
		this.language = language;
		this.langParam = this.language === "spanish" ? "es" : "en";
		this.formText.title = this[language].title;
		this.formText.placeholder = this[language].placeholder;
		this.formText.cta = this[language].cta;
		this.seeMoreButton = this[language].seeMoreButton;
		this.listHeader = this[language].listHeader;
		this.trackingPixelsSet = false;
	},

	////////////////////////////////////////////////////////////////////////
	// events
	////////////////////////////////////////////////////////////////////////
	events: {
		updateMapTrigger: function (activeOffice) {
			this.$broadcast("updateMap", activeOffice);
		},
	},
	////////////////////////////////////////////////////////////////////////
	// methods
	////////////////////////////////////////////////////////////////////////
	methods: {
		revealContent() {
			$(".vue-hidden").removeClass("vue-hidden");
			this.showMore = true;
		},

		setTrackingPixels(event) {
			// Google Analytics
			if (window.ga) {
				ga("send", "event", "Requested Offices", this.zipcode);
			}

			var head = document.getElementsByTagName("head")[0],
				body = document.getElementsByTagName("body")[0];
		},

		getData(event) {
			this.showMore = false;

			event.preventDefault();

			document.getElementById("map-field").value;

			this.error = "";

			this.loading = true;

			let key = encodeURI("zipcode");
			let value = encodeURI(document.getElementById("map-field").value);

			//console.log(value);

			if (value.length === 5) {
				value = encodeURI(document.getElementById("map-field").value);
			} else {
				value = this.zipcode.replace(/ /g, "+");
			}

			if (document.getElementById("map-field").value.trim() === "") {
				this.loading = false;

				if (this.language === "spanish") {
					this.error = "Dejaste esto en blanco. Por favor, escribe un código postal de 5 dígitos y envía.";
				} else {
					this.error = "Oops, You left this blank. Please add a 5 digit zipcode and submit.";
				}
				return;
			}

			// var endpoint= `/getData?${key}=${value}&language=${this.langParam}`,
			// 	additionalParams = '';

			var endpoint = "/getData";
			var queryString = `${key}=${value}&language=${this.langParam}`;
			if (window.location.search) {
				queryString += "&" + window.location.search.split("?")[1];
			}

			//console.log(endpoint+'?'+queryString)
			this.$http.get(endpoint + "?" + queryString).then(
				(response) => {
					if (response.body.error) {
						this.error = response.body.error;
						this.loading = false;
						// Google Analytics
						if (window.ga) {
							var eventID = response.body.eventID ? response.body.eventID : null;
							ga("send", "event", "Office Request Failed", this.zipcode, eventID);
						}

						// Facebook pixel
						if (window.fbq) {
							fbq("track", "Office Request Failed", {
								eventID: eventID,
								zipcode: value,
							});
						}

						return;
					}

					// Insert state-specific content - COVID-19 message

					const messageSection = document.getElementById("message-section");
					let stateShortName = response.body.user.shortName;
					messageSection.innerHTML =
						"<p>For the latest information about WIC services near you, visit your state’s <a class='stateMessage__link' href='#' target='_blank'>WIC website</a>.</p>";
					let link = messageSection.getElementsByClassName("stateMessage__link")[0];

					console.log(response.body);

					if (stateShortName === "AL") {
						link.setAttribute("href", "https://www.alabamapublichealth.gov/wic/index.html");
					}
					if (stateShortName === "AK") {
						link.setAttribute("href", "http://dhss.alaska.gov/dpa/Pages/nutri/wic/participants/participant-forms.aspx");
					}
					if (stateShortName === "AZ") {
						link.setAttribute("href", "http://clinicsearch.azbnp.gov/");
					}
					if (stateShortName === "AR") {
						link.setAttribute("href", "https://www.healthy.arkansas.gov/programs-services/topics/wic");
					}
					if (stateShortName === "CA") {
						link.setAttribute("href", "https://m.wic.ca.gov/");
					}
					if (stateShortName === "CO") {
						link.setAttribute("href", "https://www.ColoradoWIC.gov");
					}
					if (stateShortName === "CT") {
						link.setAttribute("href", "https://portal.ct.gov/DPH/WIC/How-To-Apply");
					}
					if (stateShortName === "DC") {
						link.setAttribute("href", "https://www.dcwic.org/");
					}
					if (stateShortName === "DE") {
						link.setAttribute("href", "https://dewow.dhss.delaware.gov/myWIC/publicpages/Eligibility.aspx");
					}
					if (stateShortName === "FL") {
						link.setAttribute("href", "http://www.floridahealth.gov/programs-and-services/wic/contact-info.html");
					}
					if (stateShortName === "GA") {
						link.setAttribute("href", "https://gaprereg.statewic.net/");
					}
					if (stateShortName === "HI") {
						link.setAttribute("href", "https://health.hawaii.gov/wic/clinic-locations/");
					}
					if (stateShortName === "ID") {
						link.setAttribute("href", "https://healthandwelfare.idaho.gov/FoodCashAssistance/WIC/tabid/3339/Default.aspx");
					}
					if (stateShortName === "IL") {
						link.setAttribute("href", "https://www.dhs.state.il.us/page.aspx?item=30513");
					}
					if (stateShortName === "IN") {
						link.setAttribute("href", "https://www.in.gov/isdh/24809.htm");
					}
					if (stateShortName === "IA") {
						link.setAttribute("href", "https://idph.iowa.gov/wic");
					}
					if (stateShortName === "KS") {
						link.setAttribute("href", "http://www.kansaswic.org/families/WIC_county_map.html");
					}
					if (stateShortName === "KY") {
						link.setAttribute("href", "https://chfs.ky.gov/agencies/dph/dmch/nsb/Pages/wic.aspx");
					}
					if (stateShortName === "LA") {
						link.setAttribute("href", "https://louisianawic.org/find/");
					}
					if (stateShortName === "ME") {
						link.setAttribute("href", "https://www.maine.gov/dhhs/mecdc/population-health/wic/");
					}
					if (stateShortName === "MD") {
						link.setAttribute("href", "https://phpa.health.maryland.gov/wic/Pages/wic-apply.aspx");
					}
					if (stateShortName === "MA") {
						link.setAttribute("href", "https://www.mass.gov/forms/apply-for-wic-online");
					}
					if (stateShortName === "MI") {
						link.setAttribute("href", "https://www.michigan.gov/wic");
					}
					if (stateShortName === "MN") {
						link.setAttribute("href", "https://www.health.state.mn.us/people/wic/ppthome.html");
					}
					if (stateShortName === "MS") {
						link.setAttribute("href", "https://msdh.ms.gov/msdhsite/_static/41,0,128.html");
					}
					if (stateShortName === "MO") {
						link.setAttribute("href", "https://health.mo.gov/living/families/wic/");
					}
					if (stateShortName === "MT") {
						link.setAttribute("href", "https://dphhs.mt.gov/publichealth/wic");
					}
					if (stateShortName === "NE") {
						link.setAttribute("href", "http://dhhs.ne.gov/Pages/WIC.aspx");
					}
					if (stateShortName === "NV") {
						link.setAttribute("href", "http://nevadawic.org/for-families/covid-19-update/");
					}
					if (stateShortName === "NH") {
						link.setAttribute("href", "https://www.dhhs.nh.gov/dphs/nhp/wic/index.htm");
					}
					if (stateShortName === "NJ") {
						link.setAttribute("href", "https://www.nj.gov/health/fhs/wic/");
					}
					if (stateShortName === "NM") {
						link.setAttribute("href", "https://www.nmwic.org/locations/");
					}
					if (stateShortName === "NY") {
						link.setAttribute("href", "https://www.health.ny.gov/prevention/nutrition/wic/how_to_apply.htm");
					}
					if (stateShortName === "NC") {
						link.setAttribute("href", "https://www.nutritionnc.com/wic/wic-referral.asp");
					}
					if (stateShortName === "ND") {
						link.setAttribute("href", "https://www.health.nd.gov/prevention/wic/how-do-i-apply-wic");
					}
					if (stateShortName === "OH") {
						link.setAttribute("href", "https://www.odh.ohio.gov/wic");
					}
					if (stateShortName === "OK") {
						link.setAttribute("href", "https://osdhcfhs.az1.qualtrics.com/jfe/form/SV_4UyhKlxQZFtzm2V");
					}
					if (stateShortName === "OR") {
						link.setAttribute("href", "https://www.oregon.gov/oha/PH/HEALTHYPEOPLEFAMILIES/WIC/Pages/interest-form.aspx");
					}
					if (stateShortName === "PA") {
						link.setAttribute("href", "https://www.pawic.com/OnlineApplication.aspx");
					}
					if (stateShortName === "RI") {
						link.setAttribute("href", "https://health.ri.gov/find/services/detail.php?id=44");
					}
					if (stateShortName === "SC") {
						link.setAttribute("href", "https://www.scdhec.gov/health/wic-nutrition-program");
					}
					if (stateShortName === "SD") {
						link.setAttribute("href", "https://sdwic.org/start-application/");
					}
					if (stateShortName === "TN") {
						link.setAttribute("href", "https://www.tn.gov/health/health-program-areas/fhw/wic.html");
					}
					if (stateShortName === "TX") {
						link.setAttribute("href", "https://texaswic.org/");
					}
					if (stateShortName === "UT") {
						link.setAttribute("href", "https://health.utah.gov/vpms/client/");
					}
					if (stateShortName === "VT") {
						link.setAttribute("href", "https://www.healthvermont.gov/applytowic");
					}
					if (stateShortName === "VA") {
						link.setAttribute("href", "https://www.myvawic.org/");
					}
					if (stateShortName === "WA") {
						link.setAttribute("href", "https://doh.wa.gov/you-and-your-family/wic");
					}
					if (stateShortName === "WV") {
						link.setAttribute("href", "https://dhhr.wv.gov/WIC/Pages/Clinic-Search.aspx");
					}
					if (stateShortName === "WI") {
						link.setAttribute("href", "https://wicmomstrong.com/");
					}
					if (stateShortName === "WY") {
						link.setAttribute("href", "https://health.wyo.gov/publichealth/wic/wic-clinic-locator/");
					}
					// end state conditionals - included DC

					// remove loading
					this.loading = false;

					// add items to the data state
					this.user = response.data.user;

					//add an index key for google maps
					this.offices = response.data.ordered.map(function (item, index) {
						var newObj = {};
						newObj = item;
						newObj.key = index;
						return newObj;
					});

					// set first item to active
					this.offices[0].active = true;

					//trigger map  render on map component
					this.$broadcast("setMap", this.offices);

					this.loaded = true;
					// Google Analytics
					if (window.ga) {
						var eventID = response.body.eventID ? response.body.eventID : null;
						ga("send", "event", "Received Offices", value, eventID);
					}

					// Facebook pixel
					if (window.fbq) {
						fbq("track", "Received Offices", {
							eventID: eventID,
							zipcode: value,
						});
					}

					window.dataLayer.push({
						selected_zipcode: value,
						selected_state: stateShortName,
					});

					console.log(value, stateShortName);

					// Floodlight
					gtag("event", "conversion", {
						allow_custom_scripts: true,
						send_to: "DC-9166779/wicflbut/wicfi0+standard",
					});

					scrollViewList();
				},
				(response) => {
					//console.log( response );
					//console.log( 'theres been an error' )
				}
			);

			return false;
		},
	},
});

////////////////////////////////////////////////////////////////////////
// utils
////////////////////////////////////////////////////////////////////////
// the callback for google maps, if we need it
var initMap = function () {
	// silence is golden
};

function scrollViewList() {
	let listView = document.getElementsByClassName("listViewSection")[0];
	listView.scrollTop = 0;
}

////////////////////////////////////////////////////////////////////////
// expose the public methods
////////////////////////////////////////////////////////////////////////

window.initMap = initMap;
