<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'index.php';

$json = json_decode(file_get_contents('php://input'), true);

$useremail = $json['email'];
$password = $json['password'];

//$useremail = $_POST['email'];
//$password = $_POST['password'];
$token = "dashdfasdf";
$null = 0;
$defaultDate = "2012-08-06";


$stmt1 = $conn->prepare("INSERT INTO User (`email`,`password`, `token`, `lastLogIn`, `lastLogOut`, `right_1-A`, `right_1-B`, `right_2-A`) VALUES (?,?,?,?,?,?,?,?);");
$stmt1->bind_param("sssssiii", $useremail, $password, $token,$defaultDate,$defaultDate,$null, $null, $null);


if ($stmt1->execute()) {

    $response = ['response' => 'success'];
    //$result = "success";

} else {
    $response = ['response' => 'fail'];
    //$result = "fail";
}

header('Content-type: application/json; charset=utf-8');

//return json_encode($result);
echo json_encode($response);
$conn->close();

?>