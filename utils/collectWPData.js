const config = require(__dirname + './../config.json')
const officesAPIURL = config.officesAPIURL

const request = require('request')
const formatPhoneNumber = require('./formatPhoneNumber')
const formatOrdinal = require('./formatOrdinal')

const collectWPData = function( userObj, resolve ) {

	//consider changing the below to [meta_key]=zip
    let url = `${ officesAPIURL }/offices?filter[meta_key]=state&filter[meta_value]=${ userObj.shortName }`
    // console.log(url)

    //console.log(url)

	request( { url: url }, ( error, response, body ) => {

		let collected = {}
		collected.user = userObj

		let wpDataset = JSON.parse( body )

		let formattedDataset = wpDataset.map( item => {
			let newObject = {}
			newObject = item.acf
			newObject.location_name = formatOrdinal( item.acf.location_name).replaceAll( "'S", "'s" )
			newObject.address_1 = formatOrdinal( item.acf.address_1 )
			newObject.address_2 = formatOrdinal( item.acf.address_2 )
			newObject.latitude = parseFloat( item.acf.latitude )
			newObject.longitude = parseFloat( item.acf.longitude )
			newObject.formattedNumber = formatPhoneNumber( newObject.telephone )
			newObject.active = false
			return newObject
		} )

		collected.list = formattedDataset
		resolve( collected )
	})
}

// add replace all functionality - only used here
String.prototype.replaceAll = function( str1, str2, ignore ) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2)
}

module.exports = collectWPData
