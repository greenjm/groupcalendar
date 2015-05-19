
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
	$("#groupname").html(Cookie.get("group"));
	getMessages();
	setInterval('refresher()', 60000);
}

var createCalendar = function() {

	var allMembers;
	var memberList = $("#memberList");
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
			console.log("calEvent: ", calEvent.id);
			console.log("jsEvent: ", jsEvent);
			console.log("view: ", view);
			viewEvent(calEvent);
		}
	});	
}

var viewEvent = function(e) {
	console.log(e.start._i);
	var start = e.start._i.split("T");
	var end = e.end._i.split("T");
	console.log(start, end);
}

var addMember = function() {
	var packet = {
		"username": $("input[name='username']").val(),
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
			console.log("successfully posted message");
			location.reload();
		},
		error: function() {
			console.log("message error");
		}
	});
}

var checkEmpty = function(array) {
	for (var item in array){
		console.log(item, array[item]);
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