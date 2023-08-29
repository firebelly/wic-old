const explodeNumber = require('./explodeNumber')

const formatAddressForVoice =  ( item ) => {
	let text = []
	text.push( explodeNumber( item.address_1 ) )
	text.push( ' | ' + item.telephone )
	return text.join( '' )
}

module.exports = formatAddressForVoice
