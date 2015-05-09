<?php
	header("Access-Control-Allow-Origin: *");

	include "set_db.php";

	$username = $_POST['username'];
	$eName = $_POST['eName'];
	$sDate = $_POST['startDate'];
	$sTime = $_POST['startTime'];
	$eDate = $_POST['endDate'];
	$eTime = $_POST['endTime'];
	$descr = $_POST['eSubj'];
	$repType = $_POST['repeatType'];
	$repAmt = $_POST['repeatAmount'];

	$query = $db->prepare("CALL createEventUser(:username, :eName, :sDate, :sTime, :eDate, :eTime, :descr, :repType, :repAmt)");
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':eName', $eName, PDO::PARAM_STR);
	$query->bindValue(':sDate', $sDate, PDO::PARAM_STR);
	$query->bindValue(':sTime', $sTime, PDO::PARAM_STR);
	$query->bindValue(':eDate', $eDate, PDO::PARAM_STR);
	$query->bindValue(':eTime', $eTime, PDO::PARAM_STR);
	$query->bindValue(':descr', $descr, PDO::PARAM_STR);
	$query->bindValue(':repType', $repType, PDO::PARAM_STR);
	$query->bindValue(':repAmt', $repAmt, PDO::PARAM_STR);
	$query->execute();

?>