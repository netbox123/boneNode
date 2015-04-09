
exports.getDateTime = function () {
    var date = new Date();
    var second = date.getSeconds();
    if (second<10) {second = '0'+second;}
	var minute = date.getMinutes();
    if (minute<10) {minute = '0'+minute;}
	var hour = date.getHours();
    if (hour<10) {hour = '0'+hour;}
	var day = date.getDate();
    if (day<10) {day = '0'+day;}
	var month = date.getMonth()+1;
    if (month<10) {month = '0'+month;}
	var year = date.getFullYear();
	var dateText = day + '-' + month + '-' + year + ' ' + hour + ':' + minute + ':' + second + ' ';
	return dateText;
}

