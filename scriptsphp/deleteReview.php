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

function deleteReview($conn, $reviewID) {

    $stmt = $conn->prepare("DELETE FROM review_likes WHERE review_ID = ?");
    $stmt->bind_param("i", $reviewID);
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM comments WHERE Review_ID = ?");
    $stmt->bind_param("i", $reviewID);
    $stmt->execute();
    $stmt = $conn->prepare("DELETE FROM reviews WHERE ID = ?");
    $stmt->bind_param("i", $reviewID);
    $stmt->execute();
    
    
    if ($stmt->affected_rows > 0) {
        return true; 
    } else {
        return false; 
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $reviewID = htmlspecialchars($_POST['review_id']);

    if (deleteReview($conn, $reviewID)) {
        echo "0";
    } else {
        echo "1";
    }
}

$conn->close();