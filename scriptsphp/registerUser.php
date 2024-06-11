<?php
// Start output buffering
ob_start();
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "127.0.0.1";
$db_username = "root";
$db_password = "";
$database = "criticats";

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $database);

function checkEmailExists($conn, $email) {
    $sql = "SELECT ID FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    return $stmt->num_rows > 0;
}

function checkUserNameExists($conn, $name) {
    $sql = "SELECT ID FROM users WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $stmt->store_result();
    return $stmt->num_rows > 0;
}
function registerUser($conn, $name, $password, $email, $birthDate) {
    $profile_picture = "C:\Users\Nahuel\Desktop\DAW\TFG\Criticats\img\userPfp\default.jpg";
    $sql = "INSERT INTO users (name, password, email, BirthDate, profile_picture) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $name, $password, $email, $birthDate, $profile_picture);
    return $stmt->execute();
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get and sanitize input
    $name = htmlspecialchars($_POST['name']);
    $password = htmlspecialchars($_POST['password']);
    $email = htmlspecialchars($_POST['email']);
    $birthdate = htmlspecialchars($_POST['birthdate']);

    // Check if email or username already exists
    if (checkEmailExists($conn, $email)) {
        echo "2";
    } elseif (checkUserNameExists($conn, $name)) {
        echo "1";
    } else {
        // Register user
        if (registerUser($conn, $name, $password, $email, $birthdate)) {
            echo "0";
        } else {
            echo "ErrorInesperado";
        }
    }
}

$conn->close();
ob_end_flush();