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

function updateListTitle($conn, $listID, $newTitle) {
    $stmt = $conn->prepare("UPDATE lists SET title = ? WHERE ID = ?");
    $stmt->bind_param("ss", $newTitle, $listID);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        return true; 
    } else {
        return false; 
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $listID = htmlspecialchars($_POST['listID']);
    $newTitle = htmlspecialchars($_POST['newTitle']);

    if (updateListTitle($conn, $listID, $newTitle)) {
        echo "0"; // Success
    } else {
        echo "1"; // Failure
    }
}

$conn->close();
?>
