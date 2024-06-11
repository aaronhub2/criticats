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

function getItems($conn, $list_id)
{
    $content_id = '';
    $items = array();

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT content_id FROM listitems WHERE list_id = ?");
    $stmt->bind_param("i", $list_id);
    $stmt->execute();
    $stmt->bind_result($content_id);

    $items = array();

    // Obtener los resultados
    while ($stmt->fetch()) {
        // Agregar cada resultado al array
        $items[] = $content_id;
    }
    // Close the statement
    $stmt->close();

    // Return the array of results
    return $items;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $list_id = intval($_POST['list_id']);

    $items = getItems($conn, $list_id);

    $_SESSION['items'] = $items;

    // Optionally, echo the JSON-encoded result if needed for the client-side
    echo json_encode($items);
}
$conn->close();
?>