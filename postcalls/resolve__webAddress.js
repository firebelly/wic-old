const languageHandler = require(__dirname + './../language.json')
const campaignData = require(__dirname + './../campaign_data.json')

const uuid = require('uuid')

const getDataByAddress = require('./../utils/getDataByAddress')
const spliceLocations = require('../utils/spliceLocations')

const sendAnalytics = require('./../analytics/sendAnalytics')
const getDistinctID = require('./../analytics/getDistinctID')
const findCampaignObject = require('./../analytics/findCampaignObject')
const makeCampignObjectFromUTM = require('./../analytics/makeCampignObjectFromUTM')


const resolve__webAddress = ( request, response ) => {

    const address = request.query.zipcode
    const eventID = uuid()

    if ( request.query.lang == 'es' ) {
        isSpanish = true
        language = 'spanish'
    } else {
        isSpanish = false
        language = 'english'
    }

    const outputHandler = languageHandler[language]['web']
    let campaignObject = makeCampignObjectFromUTM( request.query )

    getDataByAddress( address )
        .then( ( data ) => {

            // add the comparator and the lsit to be ordered by, return count (optional),  a zipcode for bubble match (optional),
            data.ordered = spliceLocations( data.user, data.list, 50, data.user.zip )


            // let debugMode = {}
            // debugMode.error = 'debug'


            // if(language === 'spanish'){
            //     debugMode.error = 'Esta funcionalidad no está disponible actualmente. Por favor, vuelva más tarde. Nos disculpamos por cualquier inconveniente.'
            // }else{
            //     debugMode.error = 'Search functionality is currently unavailable. Please check back later. We apologize for any inconvenience'
            // }

            // until fixed we'll pu tin maintiance mode
            // response.send( debugMode )


            data.eventID = eventID
            response.send( data )


            sendAnalytics( 'offices-request-success', {
                _eventID: eventID,
                'request-type': 'Website',
                'request-language': language,
                'request-zip': data.user.zip,
                'request-state': data.user.longName
            }, campaignObject, getDistinctID(request) )
        })
        .catch( ( errorMessage ) => {

            console.log('im in a error state');
            console.log(errorMessage);

            let data = {}

            console.log(errorMessage);

            data.error = errorMessage
            data.eventID = eventID
            response.send( data )

            sendAnalytics('offices-request-failure', {
                _eventID: eventID,
                'request-type': 'Website',
                'request-language': language,
                'request-zip': data.user.zip,
                'request-error': data.error,
            }, campaignObject, getDistinctID(request))

        })

}


module.exports = resolve__webAddress
