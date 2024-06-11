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

function manageLikes($conn, $review_id, $user_id, $value)
{

    if ($value == 1) {
        $stmt = $conn->prepare("INSERT INTO review_likes (review_ID, User_ID, value) VALUES (?, ?, ?)");
        $stmt->bind_param("sii", $review_id, $user_id, $value);

        if (!$stmt->execute()) {
            $conn->rollback();
            return false;
        }

        return true;
    }else if($value == 0){
        $stmt = $conn->prepare("DELETE FROM review_likes WHERE review_id = ? AND user_id = ?");
        $stmt->bind_param("ss", $review_id, $user_id);

        if (!$stmt->execute()) {
            $conn->rollback();
            return false;
        }

        return true;
    }else{
        return false;
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $review_id = intval($_POST['review_id']);
    $value = intval($_POST['value']);
    $user_id = $_SESSION['user_id'];


    if (manageLikes($conn, $review_id, $user_id, $value)) {
        echo "0";
    } else {
        echo "1";
    }
}

$conn->close();
?>