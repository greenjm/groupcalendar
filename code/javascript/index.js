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

var getLoginCredentials = function() {
	var username = $("input[name=username]").val();
	var password = $("input[name=password]").val();
	return {username: username, password: password};
}

var login = function() {
	$("#login-error").hide();
	var credentials = getLoginCredentials();

	var packet = {
		"username": credentials["username"].trim(),
		"password": credentials["password"].trim()
	};
	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/login.php',
		datatype: "html",
		data: packet,
		success: function(data) {
				document.getElementById('nav-options').innerHTML = MENU_LEFT;
				document.getElementById('login-sect').innerHTML = MENU_RIGHT;
				$("#login-close").click();
				//window.location.href="user_cal.php";
		},
		error: function(data) {
			$("#login-error").show();
		}
	});

	/*Just filler fow now*/
	
}

var getRegisterFields = function() {
	var name = $("input[name=reg-name]").val();
	var username = $("input[name=reg-user]").val();
	var pass = $("input[name=reg-pass]").val();
	var passCon = $("input[name=reg-confirm-pass").val();
	var email = $("input[name=reg-email]").val();
	var emailCon = $("input[name=reg-confirm-email]").val();
	return {name: name, username: username, password: pass, passCon: passCon, email: email, emailCon: emailCon};
}

var register = function() {
	$("#pass-error").hide();
	$("email-error").hide();
	$("user-error").hide();
	var fields = getRegisterFields();

	var packet = {
		"name": fields["name"],
		"username": fields["username"],
		"password": fields["password"],
		"passCon": fields["passCon"],
		"email": fields["email"],
		"emailCon": fields["emailCon"]
	};
	if(packet["password"] != packet["passCon"]){
		$("#pass-error").show();
		return;
	}
	if(packet["email"] != packet["emailCon"]){
		$("#email-error").show();
		return;
	}

	$.ajax({
		method: "POST",
		url: 'http://groupcalendar.csse.rose-hulman.edu/register.php',
		data: packet,
		success: function(data) {
			console.log(data);
			if(data === "taken"){
				console.log("got 1");
				$("#user-error").show();
				return;
			} else {
				console.log("not 1");
				$("#reg-close").click();
			}
		}
	});
	/*Filler function*/	
}

var clearCookies = function() {
	/*Filler function*/
	console.log("success");
	beforeLoggedInBar();
}