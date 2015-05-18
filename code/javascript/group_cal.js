
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
			color: 'red',
			textColor: '#ffffff',
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
	$("#groupname").html(Cookie.get("group"));
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
		success: function(data) {
			var data1 = JSON.parse(data);
			allMembers = data1;
			console.log(allMembers);
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
			url: 'http://groupcalendar.csse.rose-hulman.edu/get_user_events.php',
			type: "GET",
			data: {
				"username": Cookie.get("username")
			},
			datatype: "json"
		},	
		defaultDate: new Date(),
		editable: false,
		eventClick: function(calEvent, jsEvent, view) {
			console.log("calEvent: ", calEvent.id);
			console.log("jsEvent: ", jsEvent);
			console.log("view: ", view);
			editAndDeleteEvent(calEvent.id);
		}
	});	
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