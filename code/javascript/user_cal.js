var SDPicker;
var EDPicker;
var STPicker;
var ETPicker;

$(document).ready(function() {
	$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultDate: new Date(),
		editable: true
	});

	var $SDInput = $("input[name=s-date]").pickadate({
            formatSubmit: 'yyyy-mm-dd',
            // min: [2015, 7, 14],
            //container: '#container',
            // editable: true,
            closeOnSelect: true,
            closeOnClear: false,
        });

    SDPicker = $SDInput.pickadate('picker');
    var $EDInput = $("input[name=e-date]").pickadate({
            formatSubmit: 'yyyy-mm-dd',
            // min: [2015, 7, 14],
            //container: '#container',
            // editable: true,
            closeOnSelect: true,
            closeOnClear: false,
        });

    EDPicker = $EDInput.pickadate('picker');

    var $STime = $("input[name=s-time]").pickatime({
    		format: 'HH:i',
    		formatSubmit: 'HH:i',
    		interval: 30,
    		closeOnSelect: true
        })
    STPicker = $STime.pickatime('timePicker');
    var $ETime = $("input[name=e-time]").pickatime({
    		format: 'HH:i',
    		formatSubmit: 'HH:i',
    		interval: 30,
    		closeOnSelect: true
        })
    ETPicker = $ETime.pickatime('timePicker');
})
window.onload = function() {
	console.log(Cookie.get("username"), " I'm here");
	getGroups();
}

var getCreateFields = function() {
	var eName = $("input[name=e-name]").val();
	var eSubj = $("input[name=e-subj]").val();
	var startDate = SDPicker.get('select', 'yyyy-mm-dd');
	var endDate = EDPicker.get('select', 'yyyy-mm-dd');
	var startTime = $("input[name=s-time]").val();
	var endTime = $("input[name=e-time]").val();
	console.log(startDate, endDate, startTime, endTime);
	var repeatType = $("input[name=repeat]:checked").val();
	var repeatAmount = $("input[name=e-amt]").val();
	var username = Cookie.get("username");
	return {
		eName: eName,
		eSubj: eSubj,
		startDate: startDate,
		endDate: endDate,
		startTime: startTime,
		endTime: endTime,
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
		"startTime": fields['startTime'],
		"endTime": fields['endTime'],
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

var getGroups = function() {
	console.log("made the getGroups function")
}