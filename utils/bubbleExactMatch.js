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

module.exports = bubbleExactMatch
