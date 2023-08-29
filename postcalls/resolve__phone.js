const campaignData = require(__dirname + './../campaign_data.json');
const languageHandler = require(__dirname + './../language.json');

const geolib = require('geolib');

const getDataByZip = require('./../utils/getDataByZip')
const findCampaignObject = require('./../analytics/findCampaignObject')
const sendAnalytics = require('./../analytics/sendAnalytics')
const formatAddressForVoice = require('../utils/formatAddressForVoice')

const resolve__phone = ( request, response ) => {
	let zip = request.query.zipcode;
	let phone = request.query.number.slice(1);
	let requestedCampaignObject = findCampaignObject( campaignData, 'unique_phone', phone );

	// Check if Spanish
	if (request.query.lang === 'spanish') {
		isSpanish = true;
		language = 'spanish';
	} else {
		isSpanish = false;
		language = 'english';
	}

	const outputHandler = languageHandler[language]['voice'];

	getDataByZip( zip )
		.then( ( data ) => {

			data.ordered = geolib.orderByDistance( data.user, data.list );
			let office = data.ordered[0];

			response.send( formatAddressForVoice( office ) );

			sendAnalytics( 'offices-request-success', {
				'request-type': 'Telephone',
				'request-language': language,
				'request-zip': zip,
				'request-state': data.user.longName
			}, requestedCampaignObject, 'Callfire-Phone' )
		})
		.catch( ( message ) => {

            console.log('an errror has been made');
            //console.log(message);

			sendAnalytics( 'offices-request-failure', {
				'request-type': 'Telephone',
				'request-language': language,
				'request-input': zip,
				'request-error': outputHandler.error.basic
			}, requestedCampaignObject, 'Callfire-Phone' )
	       });
}


module.exports = resolve__phone
