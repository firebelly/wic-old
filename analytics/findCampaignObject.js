const _ = require('lodash');

var findCampaignObject = function (data, key, val) {
    var campaignObject = {},
        campaign = {},
        requestedCampaign = _.find(data, item => {
            return item[key] === val;
        });
    if (requestedCampaign) {
        campaignObject['request-campaign'] = (requestedCampaign.campaign) ? requestedCampaign.campaign : 'Not Set';
        campaignObject['request-medium'] = (requestedCampaign.medium) ? requestedCampaign.medium : 'Not Set';
        campaignObject['request-source'] = (requestedCampaign.source) ? requestedCampaign.source : 'Not Set';
        campaignObject['request-language'] = (requestedCampaign.language) ? requestedCampaign.language : 'Not Set';
        campaignObject['request-unique_url'] = (requestedCampaign['unique_url']) ? requestedCampaign['unique_url'] : 'Not Set';
        campaignObject['request-unique_shortcode'] = (requestedCampaign['unique_shortcode']) ? requestedCampaign['unique_shortcode'] : 'Not Set';
        campaignObject['request-unique_phone'] = (requestedCampaign['unique_phone']) ? requestedCampaign['unique_phone'] : 'Not Set';
        return campaignObject;
    }
}


module.exports = findCampaignObject
