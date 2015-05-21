
var clearCookies = function() {
	/*Filler function*/
	var date = new Date();
	Cookie.remove("username");
	Cookie.remove("group");
	Cookie.remove("groupID");
	Cookie.remove("toView");
	//beforeLoggedInBar();
	window.location.href = "index.php";
}

var searchUsers = function() {
	$("#results").empty();
	var query = $("input[name=search]").val();
	if (!/^[a-zA-Z0-9- ]*$/.test(query)) {
		return;
	}
	if (query.trim() == ""){
		return;
	}
	var resultList = $("#results");
	var packet = {
		"search": query
	};
	$.ajax({
		type: "GET",
		url: 'http://groupcalendar.csse.rose-hulman.edu/search_users.php',
		data: packet,
		success: function(datum) {
			$("#show-results").trigger('click');
			var data = JSON.parse(datum);
			for(var name in data){
				var item = $("<li class='list-group-item' onclick='redirect(this)'>\n \n</li>");
				var text = data[name];
				item.append(text);
				resultList.append(item);
			}
		},
		error: function() {
			console.log("there was an error");
		}
	});
}

var redirect = function(item) {
	var addToCookie = item.innerHTML.trim();
	Cookie.set("toView", addToCookie);
	window.location.href = "user_cal.php";
}