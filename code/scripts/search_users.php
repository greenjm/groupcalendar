<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$search = $_GET['search'];

	$query = $db->prepare("CALL searchUsers(:search)");
	$query->bindValue(':search', "%" . $search . "%", PDO::PARAM_STR);

	$results = array();

	if($query->execute()){
		while($row = $query->fetch(PDO::FETCH_ASSOC)){
			$results[] = $row['username'];
		}
	}

	echo json_encode($results);
?>