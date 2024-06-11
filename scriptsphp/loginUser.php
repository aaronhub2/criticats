<?php
session_start();
ob_start(); // Start output buffering

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "criticats";

$conn = new mysqli($servername, $username, $password, $database);
function login($conn, $name, $password)
{
    $user_id = null;
    $username = null;
    $email = null;
    $profile_picture = null;
    $desc = null;

    $stmt = $conn->prepare("SELECT ID, name, email, profile_picture, description FROM users WHERE name = ? AND password = ?");
    $stmt->bind_param("ss", $name, $password);
    $stmt->execute();
    $stmt->bind_result($user_id, $username, $email, $profile_picture, $desc);
    $stmt->fetch();
    $stmt->close();
    $profile_picture = str_replace("\\", "/", $profile_picture);
    $profile_picture = '../img/userPfp/'.basename($profile_picture);




    // Check if the user_id is not null (i.e., login successful)
    if ($user_id !== null) {
        // Return the user information
        return array('id' => $user_id, 'name' => $username, 'email' => $email, 'pfp' => $profile_picture, 'desc' => $desc);
    } else {
        // Return false to indicate login failure
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $password = htmlspecialchars($_POST['password']);

    $response = login($conn, $name, $password);

    if ($response !== false) {
        $_SESSION['user_id'] = $response['id'];
        $_SESSION['username'] = $response['name'];
        $_SESSION['email'] = $response['email'];
        $_SESSION['pfp'] = $response['pfp'];
        $_SESSION['desc'] = $response['desc'];
        echo "oki";
    } else {
        echo "Login failed. Please try again.";
    }
}

$conn->close();
ob_end_flush(); // End output buffering and flush output