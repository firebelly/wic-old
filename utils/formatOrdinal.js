const formatOrdinal = ( str ) => {
	return str.replace(/[0-9][A-Z]/, (str) => {
        return str.toLowerCase()
    })
}

module.exports = formatOrdinal
