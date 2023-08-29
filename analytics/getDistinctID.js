const config = require(__dirname + './../config.json')
const mixpanelID = config.mixpanelID;

var getDistinctID = function (req) {
    if (req.cookies['mp_' + mixpanelID + '_mixpanel']) {
        var mpCookie = JSON.parse(req.cookies['mp_' + mixpanelID + '_mixpanel']);
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

module.exports = getDistinctID
