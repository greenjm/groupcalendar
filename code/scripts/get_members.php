<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	if(!isset($_GET['groupID'])) {
		die("no group currently selected");
	}

	$groupID = $_GET['groupID'];

	$query = $db->prepare('CALL getGroupMems(:groupID)');
	$query->bindValue(":groupID", $groupID, PDO::PARAM_INT);
	$query->execute();

	$results = array();

	while($row = $query->fetch(PDO::FETCH_ASSOC)) {
		$results[] = $row['username'];
	}

	echo json_encode($results);