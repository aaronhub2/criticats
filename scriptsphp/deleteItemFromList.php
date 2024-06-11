<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "criticats";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function deleteItemFromList($list_id, $content_id, $conn)
{

    $sql = "DELETE FROM `listitems` WHERE `list_id` = $list_id AND `content_id` = $content_id";


    if (mysqli_query($conn, $sql)) {

        return true;
    } else {

        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $list_id = intval($_POST['list_id']);
    $content_id = intval($_POST['content_id']);
    


    if (deleteItemFromList($list_id, $content_id, $conn)) {

        echo "0";
    } else {

        echo "1";
    }
}

$conn->close();
