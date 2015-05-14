<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$username = $_POST['username'];
	$groupID = $_POST['groupID'];

	$query = $db->prepare('CALL removeMember(:username, :groupID)');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':groupID', $groupID, PDO::PARAM_INT);
	$query->execute();

?>