var SDPicker;
var EDPicker;
var STPicker;
var ETPicker;

$(document).ready(function() {

	createCalendar();

	/*$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: {
			url: 'http://groupcalendar.csse.rose-hulman.edu/get_user_events.php',
			type: 'GET',
			data: {
				"username": Cookie.get("username")
			},
			datatype: 'json',
			color: 'blue',
			textColor: 'black',
			success: function(data){
				console.log("getting data...", data);
			},
			error: function(data){
				console.log("error...", data);
			}
		},		
		defaultDate: new Date(),
		editable: true
	});*/

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

var createCalendar = function() {
	var packet = {
		"username": Cookie.get("username")
	};
	var eventList = [];
	$.ajax({
		url: 'http://groupcalendar.csse.rose-hulman.edu/get_user_events.php',
		type: 'GET',
		datatype: 'json',
		data: packet,
		success: function(data1) {
			var data = JSON.parse(data1);
			console.log(data);
			for (var id in data){
				var e = {
					"id": data[id]['id'],
					"title": data[id]['title'],
					"start": data[id]['start'],
					"end": data[id]['end']
				};
				eventList.push(e);
			}
			console.log("events.json", eventList);
		}
	});
	$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: eventList,		
		defaultDate: new Date(),
		editable: true
	});	
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
		"eventID": fields['eventID']
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
	var packet = {
		"username": Cookie.get("username")
	};
	var groupList = $("#groupList");
	groupList.empty();
	$.ajax({
		method: "GET",
		url: 'http://groupcalendar.csse.rose-hulman.edu/get_groups.php',
		datatype: 'json',
		data: packet,
		success: function(data){
			var data1 = JSON.parse(data);
			console.log(data1);
			for(var id in data1){
				var item = $("<li class='list-group-item' onclick='groupClicked(this)'>\n \n</li>");
				item.attr("id", data1[id]['id']);
				var name = data1[id]['name'];
				console.log("name", name);
				item.append(name);
				groupList.append(item);
			}
		}
	});
}

var groupClicked = function(group){
	console.log(group.id);
	console.log(group.innerText);
	Cookie.set("group", group.innerText);
	Cookie.set("groupID", group.id);
	window.location.href="group_cal.php";
}

var createGroup = function() {
	var packet = {
		"username": Cookie.get("username"),
		"name": $("input[name='gName']").val(),
		"purp": $("input[name='gPurp']").val()
	}
	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/create_group.php',
		data: packet,
		success: function(data){
			console.log("Created the group", data);
			getGroups();
		}
	});
}