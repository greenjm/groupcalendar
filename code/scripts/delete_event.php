<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$eventID = $_POST['eventID'];

	$query = $db->prepare("CALL deleteEvent(:eventID)");
	$query->bindValue(":eventID", $eventID, PDO::PARAM_INT);
	$query->execute();
?>