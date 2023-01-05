<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'index.php';

$json = json_decode(file_get_contents('php://input'), true);

//$useremail =  $_POST['email'];

$useremail = $json['email'];

$stmt = $conn->prepare("SELECT * FROM User WHERE email = ?");
$stmt->bind_param('s', $useremail);
$stmt->execute();
$result = $stmt->get_result();

$count_results = mysqli_num_rows($result);
$now = date("Y-m-d h:i:s");

header('Content-type: application/json; charset=utf-8');

if ($count_results >= 1) {
    $row = $result->fetch_assoc();

    $DateUpdate= "UPDATE User SET lastLogOut = '$now' WHERE email = '$useremail'";
    $conn->query($DateUpdate);
    
    $response = "logout success";

    echo json_encode($response);

} else {
    echo json_encode("fail");
}

$conn->close();


?>