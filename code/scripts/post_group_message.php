<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$username = $_POST['username'];
	$groupID = $_POST['groupID'];
	$message = $_POST['message'];

	$query = $db->prepare("CALL makeMessageGroup(:username, :groupID, :message)");
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindvalue(':groupID', $groupID, PDO::PARAM_INT);
	$query->bindValue(':message', $message, PDO::PARAM_STR);
	$query->execute();

?>