<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "criticats";

session_start();

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function getReviewFromID($conn, $review_id) {
    $stmt = $conn->prepare("SELECT ID, Titulo, User_ID, Content_ID, text, rating, tipo FROM reviews WHERE ID = ?");
    $stmt->bind_param("i", $review_id);

    $stmt->execute();
    $result = $stmt->get_result();
    $review = $result->fetch_assoc();


    $stmt->close();

    return $review;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $review_id = htmlspecialchars($_POST['review_id']);
    $review = getReviewFromID($conn, $review_id);

    echo json_encode($review);
    
}

$conn->close();
?>
