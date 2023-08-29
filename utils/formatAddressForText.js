const formatAddressForText = ( item, zip, isSpanish ) => {
	let text = []
	let callText = 'Call '

	if ( isSpanish ) {
		text.push( 'Oficina de WIC cerca de: ' )
		callText = 'Llama '

	} else {
		text.push( 'WIC Location Near: ' )
	}


	console.log('this is from make text' )
	console.log(isSpanish)

	text.push( zip  + '\n \n' )
	text.push( item.city + ', ' + item.state + '\n' )
	text.push( item.address_1 + ', ' + item.address_2 + '\n' )
	text.push( callText + item.telephone )

	return text.join( '' )
}

module.exports = formatAddressForText
