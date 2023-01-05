<?php


$db_name ="Authentication";
$mysql_username = "root";
$mysql_password = "toor";
$server_name = "localhost";

$conn = mysqli_connect($server_name, $mysql_username , $mysql_password , $db_name);

if (!$conn) {
    echo "Error";
}

?> 
