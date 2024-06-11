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

function deleteUser($conn, $userID) {
    
    $stmt = $conn->prepare("DELETE FROM reviews WHERE User_ID = ?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM comments WHERE User_ID = ?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM lists WHERE User_ID = ?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM users WHERE ID = ?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    
    
    if ($stmt->affected_rows > 0) {
        return true; 
    } else {
        return false; 
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $userID = htmlspecialchars($_POST['userId']);

    if (deleteUser($conn, $userID)) {
        echo "0";
    } else {
        echo "1";
    }
}

$conn->close();