<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$username = $_GET['username'];

	$query = $db->prepare('CALL retrieveEvents(:username)');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	//$query->execute();

	$results = array();

	if($query->execute()) {
		while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
			$e_id = $row['eventID'];
			$e_name = $row['name'];
			$start = $row['initDate'] . "T" . $row['initTime'];
			$end = $row['endDate'] . "T" . $row['endTime'];

			$results[$e_id] = array();
			$results[$e_id]['id'] = $e_id;
			$results[$e_id]['title'] = $e_name;
			$results[$e_id]['start'] = $start;
			$results[$e_id]['end'] = $end;
		}
	}

	echo json_encode($results);

?>