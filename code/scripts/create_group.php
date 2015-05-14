<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$username = $_POST["username"];
	$name = $_POST["name"];
	$purpose = $_POST["purp"];

	$query = $db->prepare('CALL createGroup(:username, :name, :purpose)');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':name', $name, PDO::PARAM_STR);
	$query->bindvalue(':purpose', $purpose, PDO::PARAM_STR);
	$query->execute();

	echo $name;
?>