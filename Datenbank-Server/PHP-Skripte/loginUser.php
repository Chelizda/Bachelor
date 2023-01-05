<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'index.php';

$json = json_decode(file_get_contents('php://input'), true);
/*
$useremail =  $_POST['email'];
$password =  $_POST['password'];
$university = $_POST['university'];
*/
$useremail = $json['email'];
$password = $json['password'];
$university = $json['university'];

$stmt = $conn->prepare("SELECT * FROM User WHERE email = ? AND password = ?");
$stmt->bind_param('ss', $useremail, $password);
$stmt->execute();
$result = $stmt->get_result();

$count_results = mysqli_num_rows($result);
$now = date("Y-m-d h:i:s");

header('Content-type: application/json; charset=utf-8');

if ($count_results >= 1) {
    $row = $result->fetch_assoc();

    $DateUpdate= "UPDATE User SET lastLogIn = '$now' WHERE email = '$useremail'";
    $conn->query($DateUpdate);
    
    $response = "success: ";

    if ($university == "CryptoUniversity") {
            $response = append_string($response, $row['right_1-A']);
            $response = append_string($response, $row['right_1-B']);
            /*
            array_merge($response, [
                'right_1-A' => $row['right_1-A'],
                'right_1-B' => $row['right_1-B'],
            ]);*/
    } else if ($university == "BlockchainSchool") {
        /*$response = array_merge($response, [
                'right_2-A' => $row['right_2-A'],
            ]);*/
            $response = append_string($response, $row['right_2-A']);

    } 
    

    echo json_encode($response);

} else {
    echo json_encode("fail");
}

$conn->close();


function append_string ($str1, $str2) {
      
    // Using Concatenation assignment
    // operator (.=)
    $str1 .=$str2;
      
    // Returning the result 
    return $str1;
}


?>

