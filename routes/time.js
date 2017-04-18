var express = require('express');
var moment = require('moment');
var router = express.Router();



// Time stamp Route
router.get('/', function(req, res) {
	var date = req;
	var unix = null;
	var natural = null;
	// Check if Unix
	if (+date >= 0){
		unix = +date;
		natural = unixToNat(unix);
	}
	// Check if Natural
	if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
		unix = natToUnix(date);
		natural = unixToNat(unix);
	}
	var dateObj = {
		"unix": unix,
		"natural": natural
	};
	res.send(dateObj);
});
function natToUnix(date) {
	return moment(date, "MMMM D, YYYY").format("X");
}
function unixToNat(unix) {
	return moment.unix(unix).format("MMMM D, YYYY");
}

module.exports = router;
