<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	// fail if no username / password is provided
	if($_POST['username'] == "" || $_POST['password'] == "") {
		http_response_code(400);
	}

	$username = $_POST['username'];
	$password = $_POST['password'];

	$query = $db->prepare('CALL login(:username, :password)');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':password', $password, PDO::PARAM_STR);
	$query->execute();

	/*if(!$query->execute()){
		echo "here";
		http_response_code(418);
	} else {
		echo "over here";
	}*/
	$rowCount = $query->rowCount();

	if($rowCount == 0) {
		http_response_code(418);
	}
?>