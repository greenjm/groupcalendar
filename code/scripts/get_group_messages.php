<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$groupID = $_GET['groupID'];

	$query = $db->prepare("CALL getMessagesGroup(:groupID)");
	$query->bindValue(':groupID', $groupID, PDO::PARAM_INT);

	$results = array();

	if($query->execute()){
		for($i = 0; $i < 10; $i++){
			if($row = $query->fetch(PDO::FETCH_ASSOC)){
				$results[$i] = array();

				$results[$i]['sender'] = $row['sender'];
				$results[$i]['msgStamp'] = $row['msgStamp'];
				$results[$i]['content'] = $row['content'];
			} else {
				break;
			}
		}
	}

	echo json_encode($results);