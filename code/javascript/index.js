var MENU_LEFT;
var MENU_RIGHT;

window.onload = function() {
	if (Cookie.exists("username")){
		console.log("success");
	} else {
		beforeLoggedInBar();
	}
}

var beforeLoggedInBar = function() {
	MENU_LEFT = $("#nav-options").html();
	MENU_RIGHT = $("#login-sect").html();
	console.log(MENU_LEFT, MENU_RIGHT);
	document.getElementById('nav-options').innerHTML = "";
	document.getElementById('login-sect').innerHTML = '<button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#login-modal">Log In</button> <button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#register-modal">Sign Up</button>';
}

var showinfo = function(id) {
	console.log("here", id);
	$("#" + id).show();
	$("#" + id).animate({height: "30%"}, 750);
}
var closeinfo = function(id) {
	$("#" + id).animate({height: "5%"}, 750, function() {
		$("#" + id).hide();
	});
	//$("#" + id).hide();
}