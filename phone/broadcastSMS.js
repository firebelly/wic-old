const config = require(__dirname + './../config.json');
// Callfire
const callfireAPIURL = config.callfireAPIURL;
const callfireUserKey = config.callfireUserKey;
const callFirePassKey = config.callFirePassKey;

const request = require('request');

const broadcastSMS = ( broadcast ) => {
	request({
		url: callfireAPIURL,
		method: "POST",
		json: broadcast
	},function (error,req) {
	}).auth( callfireUserKey, callFirePassKey, false );
}

module.exports = broadcastSMS
