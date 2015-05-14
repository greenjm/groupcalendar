<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$groupID = $_POST['groupID'];

	$query = $db->prepare('CALL deleteGroup(:groupID)');
	$query->bindValue(':groupID', $groupID, PDO::PARAM_INT);
	$query->execute();

?>