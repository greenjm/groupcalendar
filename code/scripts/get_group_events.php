<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";
	include "utils.php";

	if (!isset($_POST['start']) || !isset($_POST['end'])) {
		die("Please provide a date range.");
	}

	$range_start = parseDateTime($_POST['start']);
	$range_end = parseDateTime($_POST['end']);

	$timezone = null;
	if (isset($_POST['timezone'])) {
		$timezone = new DateTimeZone($_POST['timezone']);
	}

	$list = $_POST['userlist'];

	$results = array();

	for($i = 0; $i < sizeof($list); $i++){
		$query = $db->prepare('CALL retrieveEvents(:username)');
		$query->bindValue(':username', $list[$i], PDO::PARAM_STR);

		if($query->execute()) {
		while ($row = $query->fetch(PDO::FETCH_ASSOC)) {

			$e_id = $row['eventID'];
			$e_name = $list[$i];
			$start = $row['initDate'] . "T" . $row['initTime'];
			$end = $row['endDate'] . "T" . $row['endTime'];

			$array = array(
				"id" => $e_id,
				"title"  => $e_name,
				"start" => $start,
				"end" => $end,
			);
			$event = new Event($array, $timezone);

			if ($event->isWithinDayRange($range_start, $range_end)) {
				$results[] = $event->toArray();
			}
		}
	}
	}
	echo json_encode($results);
?>