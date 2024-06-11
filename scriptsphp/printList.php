<?php
// Establish database connection
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "criticats";

session_start();

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function getContentIDsByTitle($conn, $title) {
    $content_id ="";
    $result = array();

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT Content_ID FROM `lists` WHERE title = ?");
    $stmt->bind_param("s", $title);
    $stmt->execute();
    $stmt->bind_result($content_id);

    // Fetch the results
    while ($stmt->fetch()) {
        $result[] = $content_id;
    }

    // Close statement
    $stmt->close();

    // Return JSON-encoded result
    return json_encode($result);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = htmlspecialchars($_POST['title']);

    $contentIDs = getContentIDsByTitle($conn, $title);

        if ($contentIDs) {
            
            echo $contentIDs;

        } else {

            echo "1";
        
        }
    
}
