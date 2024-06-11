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

function getReviewsCID($conn, $content_id) {
    $stmt = $conn->prepare("SELECT ID, Titulo, User_ID, Content_ID, text, rating, tipo FROM reviews WHERE Content_ID = ?");
    $stmt->bind_param("i", $content_id);

    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Get likes count
            $stmt_likes = $conn->prepare("SELECT COUNT(value) AS likes FROM review_likes WHERE value = 1 AND review_id = ?");
            $stmt_likes->bind_param("i", $row['ID']);
            $stmt_likes->execute();
            $result_likes = $stmt_likes->get_result();
            $likes = $result_likes->fetch_assoc()['likes'];

            // Get dislikes count
            $stmt_dislikes = $conn->prepare("SELECT COUNT(value) AS dislikes FROM review_likes WHERE value = -1 AND review_id = ?");
            $stmt_dislikes->bind_param("i", $row['ID']);
            $stmt_dislikes->execute();
            $result_dislikes = $stmt_dislikes->get_result();
            $dislikes = $result_dislikes->fetch_assoc()['dislikes'];

            // Add likes and dislikes to the review array
            $row['likes'] = $likes;
            $row['dislikes'] = $dislikes;

            $reviews[] = $row;

            $stmt_likes->close();
            $stmt_dislikes->close();
        }
    }

    $stmt->close();

    return $reviews;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $content_id = htmlspecialchars($_POST['content_id']);
    $reviews = getReviewsCID($conn, $content_id);

    echo json_encode($reviews);
}

$conn->close();
?>
