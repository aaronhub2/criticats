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

function getReviewAVG($conn, $content_id) {
    $stmt = $conn->prepare("SELECT AVG(rating) AS average_rating FROM reviews WHERE Content_ID = ?");
    $stmt->bind_param("i", $content_id);

    $stmt->execute();
    $result = $stmt->get_result();

    $row = $result->fetch_assoc();

    $average_rating = $row['average_rating'];

    $stmt->close();

    return $average_rating;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $content_id = htmlspecialchars($_POST['content_id']);
    $reviewAVG = getReviewAVG($conn, $content_id);

    echo $reviewAVG;
}

$conn->close();
?>
