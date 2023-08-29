const languageHandler = require(__dirname + './../language.json')
const campaignData = require(__dirname + './../campaign_data.json')

const uuid = require('uuid')

const getDataByZip = require('./../utils/getDataByZip')
const spliceLocations = require('../utils/spliceLocations')

const sendAnalytics = require('./../analytics/sendAnalytics')
const getDistinctID = require('./../analytics/getDistinctID')
const findCampaignObject = require('./../analytics/findCampaignObject')
const makeCampignObjectFromUTM = require('./../analytics/makeCampignObjectFromUTM')


const resolve__webZipcode = ( request, response ) => {

    const zip = request.query.zipcode
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

    getDataByZip( zip )
        .then( ( data ) => {

            // add the comparator and the lsit to be ordered by, return count (optional),  a zipcode for bubble match (optional),
            data.ordered = spliceLocations( data.user, data.list, 50, zip )

            data.eventID = eventID

            // let debugMode = {}
            // debugMode.error = 'debug'


            // if(language === 'spanish'){
            //     debugMode.error = 'Esta funcionalidad no está disponible actualmente. Por favor, vuelva más tarde. Nos disculpamos por cualquier inconveniente.'
            // }else{
            //     debugMode.error = 'Search functionality is currently unavailable. Please check back later. We apologize for any inconvenience'
            // }

            // until fixed we'll pu tin maintiance mode
            response.send( data )

            sendAnalytics( 'offices-request-success', {
                _eventID: eventID,
                'request-type': 'Website',
                'request-language': language,
                'request-zip': zip,
                'request-state': data.user.longName
            }, campaignObject, getDistinctID( request ) )
        })
        .catch( ( message ) => {
            let data = {}

            data.error = outputHandler.error.basic
            data.eventID = eventID
            response.send( data )

            sendAnalytics( 'offices-request-failure', {
                _eventID: eventID,
                'request-type': 'Website',
                'request-language': language,
                'request-input': zip,
                'request-error': data.error,
            }, campaignObject, getDistinctID( request ) )

        })

}

module.exports = resolve__webZipcode
