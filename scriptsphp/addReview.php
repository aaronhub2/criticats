<?php
session_start();

// Handle CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "criticats";

$conn = new mysqli($servername, $username, $password, $database);

function addReview($conn, $user_id, $content_id, $title, $text, $rating, $tipo) {
    // Prepare a SQL statement to insert the review
    $stmt = $conn->prepare("INSERT INTO reviews (Titulo, User_ID, Content_ID, text, rating, tipo) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("siisii", $title, $user_id, $content_id, $text, $rating, $tipo);
    
    // Execute the SQL statement
    if ($stmt->execute()) {
        return true;
    } else {
        return false;
    }
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the user ID from the session
    $user_id = $_SESSION['user_id'];
    // Get the content ID, review title, review text, and rating from the POST data
    $content_id = htmlspecialchars($_POST['content_id']); 
    $title = htmlspecialchars($_POST['title']);
    $text = htmlspecialchars($_POST['text']);
    $rating = htmlspecialchars($_POST['rating']);
    $tipo = htmlspecialchars($_POST['tipo']);


    if (addReview($conn, $user_id, $content_id, $title, $text, $rating, $tipo)) {
        echo "0";
    } else {
        echo "1";
    }
}

$conn->close();
