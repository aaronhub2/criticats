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
function deleteComment($conn, $commentID)
{

    $stmt = $conn->prepare("DELETE FROM comments WHERE ID = ?");
    $stmt->bind_param("i", $commentID);
    $stmt->execute();


    if ($stmt->affected_rows > 0) {
        return true;
    } else {
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $commentID = htmlspecialchars($_POST['commentID']);


    if (deleteComment($conn, $commentID)) {
        echo true;
    } else {
        echo false;
    }
}

$conn->close();