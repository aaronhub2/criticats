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

function getCommentCount($conn, $review_id) {
    $stmt = $conn->prepare("SELECT count(ID) AS comment_count FROM comments WHERE Review_ID = ?");
    $stmt->bind_param("i", $review_id);

    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $comment_count = $row['comment_count'];

    $stmt->close();

    return $comment_count;
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $review_id = htmlspecialchars($_POST['review_id']);
    $comment_count = getCommentCount($conn, $review_id);

    echo $comment_count;
    
}

$conn->close();
?>
