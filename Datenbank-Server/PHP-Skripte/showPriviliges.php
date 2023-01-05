<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'index.php';


//$useremail =  $_POST['email'];
//$university = $_POST['university'];

$useremail = $json['email'];
$university = $json['university'];

$stmt = $conn->prepare("SELECT * FROM User WHERE email = ?");
$stmt->bind_param('s', $useremail);
$stmt->execute();
$result = $stmt->get_result();

header('Content-type: application/json; charset=utf-8');
$count_results = mysqli_num_rows($result);

if ($count_results >= 1) {
    $row = $result->fetch_assoc();

    if ($university == "CryptoUniversity") {
        $response = "CryptoUniversity: ";
        $response = append_string($response, $row['right_1-A']);
        $response = append_string($response, $row['right_1-B']);
        /*
        array_merge($response, [
            'right_1-A' => $row['right_1-A'],
            'right_1-B' => $row['right_1-B'],
        ]);*/
    } else if ($university == "BlockchainSchool") {
        $response = "BlockchainSchool: ";
        $response = append_string($response, $row['right_2-A']);

} 

echo json_encode($response);
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