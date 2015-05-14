<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$username = $_GET['username'];

	$query = $db->prepare('CALL retrieveGroups(:username)');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	//$query->execute();

	$results = array();

	if($query->execute()) {
		while($row = $query->fetch(PDO::FETCH_ASSOC)){
			$id = $row['groupID'];
			$name = $row['name'];

			$results[$id] = array();
			$results[$id]['id'] = $id;
			$results[$id]['name'] = $name;
		}
	}

	echo json_encode($results);

?>