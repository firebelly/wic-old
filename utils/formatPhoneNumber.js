const formatPhoneNumber = ( phonenum ) => {
	let regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;

	if ( regexObj.test( phonenum ) ) {

		let parts = phonenum.match( regexObj )
		let phone = ""

		if ( parts[1] ) {
			phone += "(" + parts[1] + ") ";
		}

		phone += parts[2] + "-" + parts[3]

		return phone
	}
}

module.exports = formatPhoneNumber
