var memberList;

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

var refresher = function() {
	location.reload();
}

window.onload = function() {
	if(Cookie.get("groupID") == null){
		clearCookies();
	}
	$("#groupname").html(Cookie.get("group"));
	getMessages();
	//setInterval('refresher()', 60000);
	Cookie.remove("toView");
}

var createCalendar = function() {

	var allMembers;
	memberList = $("#memberList");
	memberList.empty();

	$.ajax({
		url: 'http://groupcalendar.csse.rose-hulman.edu/get_members.php',
		type: 'GET',
		data: {
			"groupID": Cookie.get("groupID")
		},
		async: false,
		success: function(data) {
			var data1 = JSON.parse(data);
			allMembers = data1;
			for(var user in data1){
				var item = $("<li class='list-group-item'>\n \n</li>");
				var username = data1[user];
				item.append(username);
				memberList.append(item);
			}
		}
	});
	$("#calendar").fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		events: {
			url: 'http://groupcalendar.csse.rose-hulman.edu/get_group_events.php',
			type: "POST",
			data: {
				"userlist": allMembers,
				"username": Cookie.get("username")
			},
			datatype: "json",
			color: 'red'
		},	
		defaultDate: new Date(),
		editable: false,
		eventClick: function(calEvent, jsEvent, view) {
			viewEvent(calEvent);
		}
	});	
}

var viewEvent = function(e) {
	var start = e.start._i.split("T");
	var end = e.end._i.split("T");
}

var searchUsers = function() {
	$("#search-results").empty();
	if($("input[name='username']").val().trim() == "") {
		return;	
	}
	var resultList = $("#search-results");
	var packet = {
		"search": $("input[name='username']").val()
	};
	$.ajax({
		type: "GET",
		url: 'http://groupcalendar.csse.rose-hulman.edu/search_users.php',
		data: packet,
		success: function(datum) {
			var data = JSON.parse(datum);
			for(var name in data){
				var item = $("<li class='list-group-item' onclick='addMember(this)'>\n \n</li>");
				var text = data[name];
				item.append(text);
				resultList.append(item);
			}
		}
	});
}

var addMember = function(user) {
	var packet = {
		"username": user.innerHTML.trim(),
		"groupID": Cookie.get("groupID")
	};
	$.ajax({
		url: 'http://groupcalendar.csse.rose-hulman.edu/add_member.php',
		type: 'POST',
		data: packet,
		success: function() {
			location.reload();
		}
	});
}

var removeMember = function() {
	var packet = {
		"username": $("input[name='remove']").val(),
		"groupID": Cookie.get("groupID")
	};
	if(packet["username"] == Cookie.get("username")){
		return;
	}
	$.ajax({
		url: 'http://groupcalendar.csse.rose-hulman.edu/remove_member.php',
		type: 'POST',
		data: packet,
		success: function() {
			location.reload();
		}
	});
}

var deleteGroup = function() {
	var packet = {
		"groupID": Cookie.get("groupID")
	};
	$.ajax({
		url: 'http://groupcalendar.csse.rose-hulman.edu/delete_group.php',
		type: 'POST',
		data: packet,
		success: function() {
			Cookie.remove("group");
			Cookie.remove("groupID");
			window.location.href = "user_cal.php";
		}
	});
}

var getMessageFields = function() {
	var username = Cookie.get("username");
	var groupID = Cookie.get("groupID");
	var message = $("input[name='message']").val();
	return {
		username: username,
		groupID: groupID,
		message: message
	};
}

var postMessage = function() {
	var fields = getMessageFields();
	if(!checkEmpty(fields)) {
		alert("There was an error");
		return;
	}
	var packet = {
		"username": fields['username'],
		"groupID": fields['groupID'],
		"message": fields['message']
	};
	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/post_group_message.php',
		data: packet,
		success: function(){
			location.reload();
		},
		error: function() {
			console.log("message error");
		}
	});
}

var checkEmpty = function(array) {
	for (var item in array)
		if(array[item] == "") {
			return false;
		}
	}
	return true;
}

var getMessages = function() {
	var packet = {
		"groupID": Cookie.get("groupID")
	}
	var messageList = $("#messageList");

	$.ajax({
		method: "GET",
		url: 'http://groupcalendar.csse.rose-hulman.edu/get_group_messages.php',
		data: packet,
		success: function(data) {
			var data1 = JSON.parse(data);
			for(var m in data1){
				var item = $("<li class='list-group-item'>\n \n</li>");
				var head = "<h4 class='list-group-item-heading'>" + data1[m]['sender'] + " said: " + "</h4>";
				var message = "<p class='list-group-item-text'>" + data1[m]['content'] + "</p>";
				item.append(head);
				item.append(message);
				messageList.append(item);
			}
		}
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
	var groupID = Cookie.get("groupID");
	return {
		eName: eName,
		eSubj: eSubj,
		startDate: startDate,
		endDate: endDate,
		startTime: startTime,
		endTime: endTime,
		repeatType: repeatType,
		repeatAmount: repeatAmount,
		groupID: groupID
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

var createGroupEvent = function() {
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
		"groupID": fields['groupID']
	};

	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/create_group_event.php',
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