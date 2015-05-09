<? php
	header("Access-Control-Allow-Origins");

	include "setdb.php";

	$username = $_GET["username"];
	$month = $_GET["month"];

	$query = $db->prepare('CALL get-events(:username, :month');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':month', $month, PDO::PARAM_STR);
	$query->execute();

	