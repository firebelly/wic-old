const config = require(__dirname + './../config.json')
const gMapsAPIURL = config.gMapsAPIURL
const googleMapAPIKey = 'AIzaSyAoL7kKE1cLNReUJBUIivowlg_TVa22iG0'

const request = require('request')
const collectWPData = require('./collectWPData')

const getDataByZip = ( zipcode, language ) => {

	let userObj = {
		zip: zipcode,
		latitude: '00.00',
		longitude: '00.00',
		longName: 'New York',
		shortName: 'NY'
	}

	return new Promise( ( resolve, reject ) => {


		let url = `${ gMapsAPIURL }/json?sensor=true&components=country:US|postal_code:${ zipcode }&key=${ googleMapAPIKey }`

		request( { url: url } , (error, response, body) => {

			let data = JSON.parse( body )

			if ( data.status === 'ZERO_RESULTS' ) {
				reject('No Results were able to be returned.')
				return false
			}

			let loc = data.results[0].geometry.location
			let zip = data.results[0].address_components.find( ( item ) => item.types.indexOf( 'administrative_area_level_1' ) != -1 )

			userObj.latitude = loc.lat
			userObj.longitude = loc.lng
			userObj.longName = zip.long_name
			userObj.shortName = zip.short_name

            collectWPData( userObj, resolve )

		} )
	})
}

module.exports = getDataByZip
