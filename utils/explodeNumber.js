var explodeNumber = function(str){
	return str.replace(/(?:\d)+/g, function(str){
		return str.split('').join(' ')
	})
}

module.exports = explodeNumber
