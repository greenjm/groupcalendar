<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$eventID = $_POST['eventID'];
	$username = $_POST['username'];

	$query = $db->prepare("CALL deleteEvent(:eventID)");
	$query->bindValue(":eventID", $eventID, PDO::PARAM_INT);
	$query->execute();
?>