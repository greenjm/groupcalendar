<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";
	include "PasswordHash.php";

	// fail if no username / password is provided
	if($_POST['username'] == "" || $_POST['password'] == "") {
		http_response_code(400);
	}

	$username = $_POST['username'];
	$password = $_POST['password'];

	$hasher = new passwordHash(8, FALSE);

	$hash_pass = $hasher->HashPassword($password);

	$query = $db->prepare('CALL login(:username');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
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
	$row = $query->fetch(PDO::FETCH_ASSOC);
	if(!$hasher->CheckPassword($password, $row["password"])) {
		http_respone_code(418);
	}
?>