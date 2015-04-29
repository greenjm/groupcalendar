var MENU_LEFT = "";
var MENU_RIGHT = "";

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

var login = function() {
	/*Just filler fow now*/
	document.getElementById('nav-options').innerHTML = MENU_LEFT;
	document.getElementById('login-sect').innerHTML = MENU_RIGHT;
	$("#login-close").click();
}

var register = function() {
	/*Filler function*/
	console.log("registered");
	$("#reg-close").click();
}

var clearCookies = function() {
	/*Filler function*/
	console.log("success");
	beforeLoggedInBar();
}