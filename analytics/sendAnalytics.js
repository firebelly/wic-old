// Mixpanel
// const uuid = require('uuid');
// var mixPanelDistinctID;
const config = require(__dirname + './../config.json')

const mixpanelID = config.mixpanelID
const Mixpanel = require('mixpanel')
const mixpanel = Mixpanel.init(mixpanelID)

//////////////////////////////////////////////////////
/// Dispatch Analytics
//////////////////////////////////////////////////////
var sendAnalytics = function ( evt, props, campaign, distinctID ) {
    props['request-campaign'] = (campaign['request-campaign']) ? campaign['request-campaign'] : 'Not Set';
    props['request-medium'] = (campaign['request-medium']) ? campaign['request-medium'] : 'Not Set';
    props['request-source'] = (campaign['request-source']) ? campaign['request-source']: 'Not Set';
    props['request-unique_url'] = (campaign['request-unique_url']) ? campaign['request-unique_url']: 'Not Set';
    props['request-unique_shortcode'] = (campaign['request-unique_shortcode']) ? campaign['request-unique_shortcode']: 'Not Set';
    props['request-unique_phone'] = (campaign['request-unique_phone']) ? campaign['request-unique_phone']: 'Not Set';

    if ( campaign['request-language'] ) {
        props['request-language'] = campaign['request-language'];
    }

    if ( distinctID ) {
        props['distinct_id'] = distinctID;
    }

    // debug props with log
    // console.log( props )

    mixpanel.track( evt, props )
    return
}

module.exports = sendAnalytics
