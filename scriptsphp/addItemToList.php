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

function isItemInList($list_id, $content_id, $conn)
{
    $list_id = intval($list_id);
    $content_id = intval($content_id);

    $sql = "SELECT * FROM `listitems` WHERE `list_id` = $list_id AND `content_id` = $content_id";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        // Item already exists in the list
        return true;
    } else {
        // Item does not exist in the list
        return false;
    }
}

function addItemToList($list_id, $content_id, $conn)
{
    // Sanitize inputs to prevent SQL injection
    $list_id = intval($list_id);
    $content_id = intval($content_id);

    // Check if the item already exists in the list
    if (isItemInList($list_id, $content_id, $conn)) {
        return false; // Item already exists, no need to add
    }

    // Prepare the SQL statement
    $sql = "INSERT INTO `listitems` (`list_id`, `content_id`) VALUES ($list_id, $content_id)";

    // Execute the SQL statement
    if (mysqli_query($conn, $sql)) {
        // Item added successfully
        return true;
    } else {
        // Error occurred
        error_log("SQL error: " . mysqli_error($conn)); // Log the error
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $content_id = htmlspecialchars($_POST['content_id']);
    $list_id = htmlspecialchars($_POST['list_id']);

    error_log("Received list_id: $list_id, content_id: $content_id"); // Log received data

    if (addItemToList($list_id, $content_id, $conn)) {
        echo "0";
    } else {
        echo "1";
    }
}

$conn->close();
?>
