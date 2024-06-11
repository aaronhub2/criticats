<?php
session_start();

$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "criticats";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function addComment($conn, $user_id, $review_id, $text) {
    $stmt = $conn->prepare("INSERT INTO comments (User_ID, Review_ID, text) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $user_id, $review_id, $text);
    
    if ($stmt->execute() === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $stmt->error;
    }
    
    $stmt->close();
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
$user_id = $_SESSION['user_id'];
$review_id= $_POST["review_id"];
$text= $_POST["text"];


addComment($conn, $user_id, $review_id, $text);
    
}

$conn->close();