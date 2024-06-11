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

function createList($conn, $user_id, $tipo) {
    // Genera el título de la lista
    $title = generateUniqueTitle($conn);

    // Inserta la lista en la base de datos
    $stmt = $conn->prepare("INSERT INTO lists (title, User_ID, tipo) VALUES (?, ?, ?)");
    $stmt->bind_param("sii", $title, $user_id, $tipo);

    if (!$stmt->execute()) {
        $conn->rollback();
        return false;
    }

    return true;
}

function generateUniqueTitle($conn) {
    // Título base
    $baseTitle = "Nueva lista";
    $counter = 1;
    $title = $baseTitle . " " . $counter;

    // Comprueba si el título ya existe en la base de datos
    $stmt = $conn->prepare("SELECT * FROM lists WHERE title = ?");
    $stmt->bind_param("s", $title);
    $stmt->execute();
    $result = $stmt->get_result();

    // Incrementa el contador hasta encontrar un título único
    while ($result->num_rows > 0) {
        $counter++;
        $title = $baseTitle . " " . $counter;
        $stmt->bind_param("s", $title);
        $stmt->execute();
        $result = $stmt->get_result();
    }

    return $title;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $tipo = intval($_POST['tipo']);

    // Recoge ID de usuario logeado
    $user_id = $_SESSION['user_id'];

    if (createList($conn, $user_id, $tipo)) {
        echo "0";
    } else {
        echo "1";
    }
}

$conn->close();
?>
