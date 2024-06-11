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

function deleteList($conn, $listID) {
    
    $stmt = $conn->prepare("DELETE FROM listitems WHERE list_id = ?");
    $stmt->bind_param("s", $listID);
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM lists WHERE ID = ?");
    $stmt->bind_param("s", $listID);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        return true; 
    } else {
        return false; 
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $listID = htmlspecialchars($_POST['listID']);

    if (deleteList($conn, $listID)) {
        echo "0";
    } else {
        echo "1";
    }
}

$conn->close();