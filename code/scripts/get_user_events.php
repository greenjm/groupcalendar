<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";
	//require dirname(__FILE__) . '/utils.php';
	include "utils.php";

	if (!isset($_GET['start']) || !isset($_GET['end'])) {
		die("Please provide a date range.");
	}

	$range_start = parseDateTime($_GET['start']);
	$range_end = parseDateTime($_GET['end']);

	$timezone = null;
	if (isset($_GET['timezone'])) {
		$timezone = new DateTimeZone($_GET['timezone']);
	}

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

	echo json_encode($results);

?>