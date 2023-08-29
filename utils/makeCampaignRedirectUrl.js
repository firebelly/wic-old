const querystring = require('querystring');

var makeCampaignRedirectUrl = function (baseUrl, object) {
	var url = baseUrl;
	var params = {
		utm_source: object['request-source'],
		utm_campaign: object['request-campaign'],
		utm_medium: object['request-medium'],
        unique_url: object['request-unique_url']
	};

	if (object['request-language'] === 'spanish') {
		params.lang = 'es';
	}
	return url + '?' + querystring.stringify(params);
}

module.exports = makeCampaignRedirectUrl
