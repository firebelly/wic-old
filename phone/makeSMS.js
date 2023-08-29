const languageHandler = require(__dirname + './../language.json')
const campaignData = require(__dirname + './../campaign_data.json')

const getDataByZip = require('../utils/getDataByZip')
const spliceLocations = require('../utils/spliceLocations')
const formatAddressForText = require('../utils/formatAddressForText')
const broadcastSMS = require('./broadcastSMS')

const sendAnalytics = require('./../analytics/sendAnalytics')
const findCampaignObject = require('./../analytics/findCampaignObject')

// function to fire based on the message
const makeSMS = ( request, campaign, distinctID, campaignObject ) => {
	let returnNumber = request.body.events[0].resource.fromNumber
	let message = request.body.events[0].resource.records[0].message
	let messageKeyword = message.trim().split(" ")[0].toLowerCase()
	let requestedCampaignObject = findCampaignObject( campaignData, 'unique_shortcode', messageKeyword )
	let messageArray = message.trim().split(" ")

	let broadcast = [{
		"phoneNumber": returnNumber,
		"attributes": {},
		"message": message
	}];

	// Check if Spanish
	if ( campaignObject &&
		campaignObject.language === 'spanish' ) {
		isSpanish = true;
		language = 'spanish';
	} else {
		isSpanish = false;
		language = 'english';
	}

	const outputHandler = languageHandler[language]['sms'];

	// Validate Message
	if ( messageArray.length <= 1 ||
	     messageArray.length >= 3 ) {

		broadcast[0].message = outputHandler.error.basic;
		broadcastSMS( broadcast );

		sendAnalytics( 'offices-request-failure', {
			'request-type' : 'SMS',
			'request-language' : language,
			'request-input' : message,
			'request-error': broadcast[0].message
		}, campaign, distinctID );

		return false;

	} else { // The correct amount of data

		let zip = messageArray[1];

		getDataByZip( zip )
			.then( ( data ) => {

				data.ordered = spliceLocations( data.user, data.list )[0]

				broadcast[0].message =  formatAddressForText( data.ordered, zip )
				broadcastSMS( broadcast );

				sendAnalytics( 'offices-request-success', {
					'request-type' : 'SMS',
					'request-language' : language,
					'request-zip' : zip,
					'request-state' : data.user.longName
				}, campaign, distinctID )

				return false;

			})
			.catch( ( message ) => {
				console.log('error');
				//console.log(message);
				broadcast[0].message = outputHandler.error.basic;

				broadcastSMS( broadcast );

				sendAnalytics('offices-request-failure', {
					'request-type' : 'SMS',
					'request-language' : language,
					'request-input' : message,
					'request-error': broadcast[0].message
				}, campaign, distinctID);

				return false;
			})
	}
}

module.exports = makeSMS
