<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
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

function checkLikeStatus($conn, $review_id, $user_id)
{
    $stmt = $conn->prepare("SELECT value FROM review_likes WHERE review_id = ? AND user_id = ?");
    $stmt->bind_param("ss", $review_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $value = $result->fetch_column();
        return $value;
    } else {
        return null;
    }

}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $review_id = intval($_POST['review_id']);
    $user_id = $_SESSION['user_id'];

    $value = checkLikeStatus($conn, $review_id, $user_id);

    if ($value !== null) {
        if ($value == '1') {
            echo 1;
        } elseif($value == '-1'){
            echo -1;
        }
    } else {
        echo $value;
    }
}

$conn->close();
?>