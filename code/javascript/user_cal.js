var SDPicker;
var EDPicker;
var STPicker;
var ETPicker;

$(document).ready(function() {

	createCalendar();

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
	if(Cookie.get("username") == null){
		clearCookies();
	}
	getGroups();
	if (Cookie.get("toView")){
		$("#create-form").hide();
		$("#group-button").hide();
	}
}

var createCalendar = function() {

	var user;
	if(Cookie.get("toView")){
		user = Cookie.get("toView");
		$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: {
			url: 'http://groupcalendar.csse.rose-hulman.edu/get_user_events.php',
			type: "GET",
			data: {
				"username": user
			},
			datatype: "json"
		},	
		defaultDate: new Date(),
		editable: false
	});	
	} else {
		user = Cookie.get("username");
	
	
	$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: {
			url: 'http://groupcalendar.csse.rose-hulman.edu/get_user_events.php',
			type: "GET",
			data: {
				"username": user
			},
			datatype: "json"
		},	
		defaultDate: new Date(),
		editable: false,
		eventClick: function(calEvent, jsEvent, view) {
			editAndDeleteEvent(calEvent.id);
		}
	});	
	}
}

var editAndDeleteEvent = function(eID) {
	$("#delete-form").trigger('click');
	$("#delete-submit").click(function() {
		deleteEvent(eID);
	});
}

var getCreateFields = function() {
	var eName = $("input[name=e-name]").val();
	var eSubj = $("input[name=e-subj]").val();
	var startDate = SDPicker.get('select', 'yyyy-mm-dd');
	var endDate = EDPicker.get('select', 'yyyy-mm-dd');
	var startTime = $("input[name=s-time]").val();
	var endTime = $("input[name=e-time]").val();
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
		if(array[item] == "") {
			return false;
		}
	}
	return true;
}

var validateEventFields = function(array) {
	var sd = array['startDate'].split("-");
	var ed = array['endDate'].split("-");
	var st = array['startTime'].split(":");
	var et = array['endTime'].split(":");
	var startDate = new Date(sd[0], sd[1], sd[2], st[0], st[1], "00");
	var endDate = new Date(ed[0], ed[1], ed[2], et[0], et[1], "00");
	if(endDate < startDate) {
		return false;
	}
	var amount = array['repeatAmount'];
	if (isNaN(parseInt(amount, 10)) || amount < 0 || amount > 10){
		return false;
	}
	if(array['repeatType'] != '0') {
		var y1 = startDate.getYear();
		var m1 = startDate.getMonth();
		var d1 = startDate.getDate();
		var y2 = endDate.getYear();
		var m2 = endDate.getMonth();
		var d2 = endDate.getDate();
		if(d1 != d2 || m1 != m2 || y1 != y2) {
			return false;
		}
	}
	if (!/^[a-zA-Z0-9- ]*$/.test(array['eName']) || !/^[a-zA-Z0-9- ]*$/.test(array['eSubj'])) {
		return false;
	}
	return true;
}

var CreateEvent = function() {
	$("#create-error").hide();
	var fields = getCreateFields();
	if(fields['repeatType'] == 0){
		fields['repeatAmount'] = "0";
	}

	if(!checkEmpty(fields)) {
		$("#create-error").text("No fields can be empty");
		$("#create-error").show();
		return;
	}
	if(!validateEventFields(fields)) {
		$("#create-error").text("one or more fields has an invalid value");
		$("#create-error").show();
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
			location.reload();
		},
		error: function(data){
			console.log("error creating event");
		}
	});
}

var deleteEvent = function(eID) {

	var packet = {
		"eventID": eID
	};

	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/delete_event.php',
		datatype: "html",
		data: packet,
		success: function(data){
			$("#delete-close").trigger('click');
			location.reload();
		},
		error: function(data) {
			console.log("unknown error occurred");
		}
	});
}

var getGroups = function() {
	var username;
	if (Cookie.get("toView")){
		username = Cookie.get("toView");
	} else {
		username = Cookie.get("username");
	}
	var packet = {
		"username": username
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
			for(var id in data1){
				var item = $("<li class='list-group-item' onclick='groupClicked(this)'>\n \n</li>");
				item.attr("id", data1[id]['id']);
				var name = data1[id]['name'];
				item.append(name);
				groupList.append(item);
			}
		}
	});
}

var groupClicked = function(group){
	if(Cookie.get("toView")){
		return;
	}
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
			getGroups();
		}
	});
}