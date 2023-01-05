<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'index.php';

$json = json_decode(file_get_contents('php://input'), true);

$useremail =  $_POST['email'];
$university = $_POST['university'];
$rightNumber = $_POST['rightNumber'];
$rightValue = $_POST['rightValue'];

//$useremail = $json['email'];
//$rightName = $json['rightName'];
//$rightValue = $json['rightValue'];

$column = "";

if($university == "CryptoUniversity") {
    if ($rightNumber == "1") {
        $column = "right_1-A";
    } else if ($rightNumber == "2") {
        $column = "right_1-B";
    }
} else if ($university == "BlockchainSchool") {
    if ($rightNumber == "1") {
        $column = "right_2-A";
    }
}
$intRightValue = intval($rightValue);

header('Content-type: application/json; charset=utf-8');
$PrivilegeUpdate= "UPDATE User SET '$column' = '$intRightValue' WHERE email = '$useremail'";

if ($conn->query($PrivilegeUpdate)) {
    $response = 'Privilege changed';
    //$result = "success";

} else {
    $response = 'Privilege change failed';
    //$result = "fail";
}

echo json_encode($response);
$conn->close();


?> 
