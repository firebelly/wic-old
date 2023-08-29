// App Data
const config = require(__dirname + '/config.json');
const campaignData = require(__dirname + '/campaign_data.json');

const express = require('express');
const favicon = require('serve-favicon')
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

// Mixpanel
const mixpanelID = config.mixpanelID;

// utils
const makeCampaignRedirectUrl = require('./utils/makeCampaignRedirectUrl')

// analytics
const sendAnalytics = require('./analytics/sendAnalytics')
const findCampaignObject = require('./analytics/findCampaignObject')
const makeCampignObjectFromUTM = require('./analytics/makeCampignObjectFromUTM')

// response functions
const resolve__webZipcode = require('./postcalls/resolve__webZipcode')
const resolve__webAddress = require('./postcalls/resolve__webAddress')
const resolve__phone = require('./postcalls/resolve__phone')
const makeSMS = require('./phone/makeSMS')

// App State
let campaignObject;


app.set( 'port', ( process.env.PORT || 5000 ) )
app.use( express.static(__dirname + '/public' ) )
app.use( bodyParser.json() )
app.use( cookieParser() )
app.set( 'views', __dirname + '/views' )
app.set( 'view engine', 'ejs' )

//////////////////////////////////////////////////////
/// wake up app
//////////////////////////////////////////////////////
app.listen( app.get( 'port' ), function () {
	console.log('alive and well at port ' + app.get( 'port' ) );
});

//////////////////////////////////////////////////////
/// Detect Subdomain
//////////////////////////////////////////////////////
app.set( 'subdomain offset', config.subdomainOffset );
app.use( function checkSubdomain ( request, response, next ) {
	let subdomains = request.subdomains;
	if ( subdomains.length ) {
		let requestedCampaignObject = findCampaignObject(campaignData, 'unique_url', subdomains[0]);
		if (requestedCampaignObject) {
			let domainParts = request.get('host').split('.');
			domainParts.shift();

			let protocol = setProtocol(request);
			let baseUrl = protocol + '://' + domainParts.join('.');

			setCampaignObject('Website', _.extend(requestedCampaignObject, { subtype: 'subdomain' }));

			let campaignRedirectUrl = makeCampaignRedirectUrl(baseUrl, requestedCampaignObject);

			return response.redirect(campaignRedirectUrl);
		}
	}
	next();
});

//////////////////////////////////////////////////////
/// routes
//////////////////////////////////////////////////////

// Home Page
app.get( '/', function( request, response ) {
  let campaignObject = makeCampignObjectFromUTM(request.query);
  let requestLang = (request.query.lang &&
                     request.query.lang === 'es') ? 'spanish' : 'english';

  const eventID = uuid();

  sendAnalytics('campaign-request', { 'request-type': 'Website', }, campaignObject, getDistinctID(request));
  response.render( 'pages/index', {
    mixpanelID : mixpanelID,
    eventID : eventID
  });
});

// Campaign Page
app.get( '/:campaign', function( request, response, next ) {
	let requestedCampaignObject = findCampaignObject(campaignData, 'unique_url', request.params.campaign);
	if (requestedCampaignObject) {
		let protocol = setProtocol(request);
		let baseUrl = protocol + '://' + request.get('host');
		let campaignRedirectUrl = makeCampaignRedirectUrl(baseUrl, requestedCampaignObject);
		return response.redirect(302, campaignRedirectUrl);
	}
	next();
});

app.get('/disclaimer', function(request, response ) {
	response.render( 'pages/disclaimer');
});

// Callfire Text
app.post( '/makeText', function ( request, response ) {
	let campaignObject
	// let returnNumber = request.body.events[0].resource.fromNumber
	let message = request.body.events[0].resource.records[0].message
	let messageKeyword = message.trim().split(" ")[0].toLowerCase()
	let requestedCampaignObject = findCampaignObject( campaignData, 'unique_shortcode', messageKeyword );
	makeSMS( request, requestedCampaignObject, 'Callfire-SMS', campaignObject );
});

// Return Map Results
app.get( '/getData', function ( request, response ) {
	const zipcode = request.query.zipcode;
	if ( isZip( zipcode ) ) {
		resolve__webZipcode( request, response )
	} else {
		resolve__webAddress( request, response )
	}
});

// Make Phone Call
app.get( '/phoneObj', function ( request, response ) {
	resolve__phone( request, response )
});

//////////////////////////////////////////////////////
/// util functions
//////////////////////////////////////////////////////
const getDistinctID = ( req ) => {
    if (req.cookies['mp_' + mixpanelID + '_mixpanel']) {
        let mpCookie = JSON.parse(req.cookies['mp_' + mixpanelID + '_mixpanel']);
        if (typeof mpCookie === 'object' &&
            mpCookie['distinct_id']) {
            return mpCookie['distinct_id'];
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const setProtocol = (request) => {
	return (!request.secure && process.env.NODE_ENV === 'production') ? 'https' : 'http';
}

const setCampaignObject = (type, object) => {
	campaignObject = object;
	let analyticsObject = {
		'request-type': type,
		'request-language': campaignObject.language
	};
}

const isZip = ( zip ) => {
	if ( zip.length == 5 ) {
		return true
	} else {
		return false
	}
}
