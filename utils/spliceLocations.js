const geolib = require('geolib');
const bubbleExactMatch = require('./../utils/bubbleExactMatch')

const spliceLocations = ( comparator, list, returnCount = 1, zip = false ) => {
    let orderedList = geolib.orderByDistance( comparator, list );

    if ( zip ) {
        orderedList = bubbleExactMatch( orderedList, zip );
    }

    return orderedList.slice( 0, returnCount )
}

module.exports = spliceLocations
