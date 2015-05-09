window.onload = function() {
	console.log(Cookie.get("username"), " I'm here");
}

var getCreateFields = function() {
	var eName = $("input[name=e-name]").val();
	var eSubj = $("input[name=e-subj]").val();
	var startDate = $("input[name=s-date]").val();
	var endDate = $("input[name=e-date]").val();
	var repeatType = $("input[name=repeat]:checked").val();
	var repeatAmount = $("input[name=e-amt]").val();
	var username = Cookie.get("username");
	return {
		eName: eName,
		eSubj: eSubj,
		startDate: startDate,
		endDate: endDate,
		repeatType: repeatType,
		repeatAmount: repeatAmount,
		username: username
	};
}

var checkEmpty = function(array) {
	for (var item in array){
		if(array[item].trim() == "") {
			return false;
		}

		console.log(item, array[item]);
	}
	return true;
}

var CreateEvent = function() {
	var fields = getCreateFields();

	if(!checkEmpty(fields)) {
		return;
	}
	var packet = {
		"eName": fields['eName'],
		"eSubj": fields['eSubj'],
		"startDate": fields['startDate'],
		"endDate": fields['endDate'],
		"startTime": '11:00',
		"endTime": '14:00',
		"repeatType": fields['repeatType'],
		"repeatAmount": fields['repeatAmount'],
		"username": fields['username']
	};

	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/create_event.php',
		datatype: "html",
		data: packet,
		success: function(data){
			console.log("event successfully created");
		},
		error: function(data){
			console.log("error creating event");
		}
	});
}

var getDeleteFields = function() {
	var eventID = $("input[name=e-id]").val();
	var username = Cookie.get("username");

	return {eventID: eventID, username: username};
}

var deleteEvent = function() {
	var fields = getDeleteFields();

	if(!checkEmpty(fields)) {
		return;
	}
	var packet = {
		"eventID": fields['eventID'],
		"username": fields['username']
	};

	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/delete_event.php',
		datatype: "html",
		data: packet,
		success: function(data){
			console.log("successful delete");
		},
		error: function(data) {
			console.log("unknown error occurred");
		}
	});
}