const campaignData = require(__dirname + './../campaign_data.json');

const findCampaignObject = require('./findCampaignObject')

var makeCampignObjectFromUTM = function( params ) {
    var campaignObject = findCampaignObject(campaignData, 'unique_url', params.unique_url);
    return (campaignObject) ? campaignObject : {};
}

module.exports = makeCampignObjectFromUTM
