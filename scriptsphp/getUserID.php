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

function getUserID($conn, $user_id) {
    $stmt = $conn->prepare("SELECT name, profile_picture FROM users WHERE ID = ?");
    $stmt->bind_param("i", $user_id);

    $stmt->execute();
    $result = $stmt->get_result();

    // Declarar variables para almacenar los valores individuales
    $name = '';
    $profile_picture = '';

    if ($result->num_rows > 0) {
        // Solo necesitamos una fila ya que ID es único
        $row = $result->fetch_assoc();
        $name = $row['name'];
        $profile_picture = $row['profile_picture'];
    }

    $stmt->close();

    $profile_picture = str_replace("\\", "/", $profile_picture);
    $profile_picture = '../img/userPfp/'.basename($profile_picture);

    // Devolver las variables como un array asociativo para facilidad de acceso
    return json_encode(array('name' => $name, 'profile_picture' => $profile_picture));
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = htmlspecialchars($_POST['user_id']);
    $user = getUserID($conn, $user_id);
    
    echo json_encode($user);
}

$conn->close();
?>
