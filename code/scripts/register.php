<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";
	include "PasswordHash.php";

	$name = $_POST["name"];
	$username = $_POST["username"];
	$password = $_POST["password"];
	$email = $_POST["email"];

	$hasher = new PasswordHash(8, FALSE);
	$hash_pass = $hasher->HashPassword($password);

	$query = $db->prepare("CALL test(:username, :name, :email, :password)");
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':name', $name, PDO::PARAM_STR);
	$query->bindValue(':email', $email, PDO::PARAM_STR);
	$query->bindValue(':password', $hash_pass, PDO::PARAM_STR);
	$query->execute();

	$row = $query->fetch(PDO::FETCH_ASSOC);

	if($row[1]) {
		echo "taken";
	} else {{
		echo "free";
	}}
	/*$result["res"] = $row[1];
	echo json_encode($result);*/
?>