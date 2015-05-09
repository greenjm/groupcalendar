<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$username = $_POST['username'];
	$password = $_POST['password'];

	$query = $db->prepare('CALL login(:username)');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->execute();

	$rowCount = $query->rowCount();

	if($rowCount == 0) {
		http_response_code(418);
	} 
	$row = $query->fetch(PDO::FETCH_ASSOC);
	$hash = '' . $row['password'];
	if (password_verify($password, $hash)) {
		echo "success";
	} else {
		http_response_code(418);
	}
?>