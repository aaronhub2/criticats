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

function getComments($conn, $review_id) {
    $stmt = $conn->prepare("SELECT ID, User_ID, Review_ID, text FROM comments WHERE Review_ID = ?");
    $stmt->bind_param("i", $review_id);

    $stmt->execute();
    $result = $stmt->get_result();
    $comments = $result->fetch_all(MYSQLI_ASSOC);

    $stmt->close();

    return $comments;
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $review_id = htmlspecialchars($_POST['review_id']);
    $comments = getComments($conn, $review_id);

    echo json_encode($comments);
}

$conn->close();
?>
