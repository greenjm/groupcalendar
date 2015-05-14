
$(document).ready(function() {

	$("#calendar").fullCalendar({
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
	$("#groupname").html(Cookie.get("group"));
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
			console.log("added member");
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
			console.log("removed member");
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