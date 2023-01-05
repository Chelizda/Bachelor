<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'index.php';

$json = json_decode(file_get_contents('php://input'), true);

$useremail = $json['email'];

//$useremail = $_POST['email'];

$stmt1 = $conn->prepare("DELETE FROM User WHERE email = ?");
$stmt1->bind_param("s", $useremail);


if ($stmt1->execute()) {

    $response = 'deletion success';
    //$result = "success";

} else {
    $response = 'deletion fail';
    //$result = "fail";
}

header('Content-type: application/json; charset=utf-8');

//return json_encode($result);
echo json_encode($response);
$conn->close();

?>