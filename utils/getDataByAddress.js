const config = require(__dirname + './../config.json')
const googleMapAPIKey = 'AIzaSyAoL7kKE1cLNReUJBUIivowlg_TVa22iG0'

const request = require('request')
const collectWPData = require('./collectWPData')

let specifictyError = ( language ) => {
    let message
    if ( language === 'english' ) {
        message = 'Please enter a more specific address by including street, city, state, and zip code.'
    } else {
        message = 'Por favor, escribe una dirección más específica que incluya la calle, la ciudad, el estado y el código postal.'
    }
    return message
}

let emptyResultsError = ( language ) => {
    let message
    if ( language === 'english' ) {
        message = 'Please check your address, no results were found.'
    } else {
        message = 'Por favor, verifica tu dirección. No se encontraron resultados.'
    }
    return message
}

const getDataByAddress = ( address, selectedLanguage = 'english' ) => {

	return new Promise( ( resolve, reject ) => {

        let url =  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapAPIKey}`
        request( { url:url } , ( error, response, body ) => {

            // parse data, get results
            let data = JSON.parse( body )
            let results = data.results

            if ( results.length == 0 ) {
                let message = emptyResultsError( selectedLanguage )
                reject( message )
                return
            }

            // // if too many results
            if ( results.length > 1 ) {
                let message = specifictyError( selectedLanguage )
                reject( message )
                return
            }


            // console.log('keep going');
            let result = results[0]
            let zip
            zip = result.address_components.find( ( item ) => item.types.indexOf( 'postal_code' ) != -1 )
            if ( zip == undefined ) {
                let message = specifictyError( selectedLanguage )
                reject( message )
                return
            }
            let userObj = {}
            let loc = data.results[0].geometry.location


			let location = data.results[0].address_components.find( ( item ) => {
                return item.types.indexOf( 'administrative_area_level_1' ) != -1
            } )

            userObj.zip = zip.short_name
			userObj.latitude = loc.lat
			userObj.longitude = loc.lng
			userObj.longName = location.long_name
			userObj.shortName = location.short_name

            collectWPData( userObj, resolve )

        })

	})
}

module.exports = getDataByAddress
