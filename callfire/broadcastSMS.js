// Callfire
const config = require(__dirname + './../config.json');
    const callfireAPIURL = config.callfireAPIURL;
    const callfireUserKey = config.callfireUserKey;
    const callFirePassKey = config.callFirePassKey;

const request = require('request');

//////////////////////////////////////////////////////
/// Dispatch SMS
//////////////////////////////////////////////////////
module.exports =  function( broadcast ) {
	request({
		url: callfireAPIURL,
		method: "POST",
		json: broadcast
	},function (error,req) {
	}).auth( callfireUserKey, callFirePassKey, false );
}
