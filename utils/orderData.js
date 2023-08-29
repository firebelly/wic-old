const geolib = require('geolib');

module.exports = ( dataSet, isZip = false) => {
    let ordered = geolib.orderByDistance( dataSet.user, dataSet.list );

    if ( isZip ) {
        //console.log('we will bubble sort this');
    }

    return ordered = ordered.slice(0, 50);
}


var bubbleExactMatch = function (list, zip) {
    var inZip = [],
        outOfZip = [];

    list.forEach(function (location) {
        if (location.postal_code == zip) {
            inZip.push(location);
        } else {
            outOfZip.push(location);
        }
    });

    return inZip.concat(outOfZip);
}
