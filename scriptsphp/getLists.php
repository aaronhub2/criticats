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

function getList($conn, $user_id)
{
    $ID = '';
    $title = '';
    $user_ID = '';
    $tipo = '';
    $lists = array();

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT ID, title, User_ID, Tipo FROM lists WHERE User_ID = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($ID, $title, $user_ID, $tipo);

    // Fetch the results
    while ($stmt->fetch()) {
        $lists[] = array(
            "ID" => $ID,
            "title" => $title,
            "User_ID" => $user_ID,
            "Tipo" => $tipo
        );
    }

    // Close the statement
    $stmt->close();

    // Return the array of results
    return $lists;
}

$user_id = $_SESSION['user_id'];

$lists = getList($conn, $user_id);

$_SESSION['lists'] = $lists;

// Optionally, echo the JSON-encoded result if needed for the client-side
echo json_encode($lists);

$conn->close();
?>
