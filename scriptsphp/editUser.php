<?php
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

$conn = new mysqli($servername, $db_username, $db_password, $database);

function checkEmailExistsForOtherUser($conn, $email, $user_id)
{
    $sql = "SELECT ID FROM users WHERE email = ? AND ID != ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $email, $user_id);
    $stmt->execute();
    $stmt->store_result();
    return $stmt->num_rows > 0;
}

function updateUser($conn, $user_id, $password, $email, $pfp, $desc)
{
    if ($password && $pfp != '') {
        $sql = "UPDATE users SET password = ?, email = ?, profile_picture = ?, description = ? WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi", $password, $email, $pfp, $desc, $user_id);

        $profile_picture = str_replace("\\", "/", $pfp);
        $profile_picture = '../img/userPfp/' . basename($profile_picture);
        $_SESSION['pfp'] = $profile_picture;

        return $stmt->execute();

    } else if (!$password && $pfp != '') {
        $sql = "UPDATE users SET email = ?, profile_picture = ?, description = ? WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $email, $pfp, $desc, $user_id);

        $profile_picture = str_replace("\\", "/", $pfp);
        $profile_picture = '../img/userPfp/' . basename($profile_picture);
        $_SESSION['pfp'] = $profile_picture;

        return $stmt->execute();
    } else if ($password && $pfp == '') {
        $sql = "UPDATE users SET password = ?, email = ?, description = ? WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $password, $email, $desc, $user_id);
        return $stmt->execute();
    } else {
        $sql = "UPDATE users SET email = ?, description = ? WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $email, $desc, $user_id);
        return $stmt->execute();
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $user_id = $_SESSION['user_id'];
    $password = htmlspecialchars($_POST['password']);
    $email = htmlspecialchars($_POST['email']);
    $desc = htmlspecialchars($_POST['desc']);

    // Manejar la subida del archivo
    if (isset($_FILES['pfp']) && $_FILES['pfp']['error'] == UPLOAD_ERR_OK) {
        $directorio_destino = "C:\\xampp\\htdocs\\img\\userPfp\\";
        $nombre_original = basename($_FILES['pfp']['name']);
        $extension = pathinfo($nombre_original, PATHINFO_EXTENSION);
        $nombre_nuevo = uniqid('user_', true) . '.' . $extension;
        $ruta_archivo = $directorio_destino . $nombre_nuevo;

        if (move_uploaded_file($_FILES['pfp']['tmp_name'], $ruta_archivo)) {
            $pfp = $ruta_archivo;
        } else {
            echo "1"; // Error al mover el archivo
            exit;
        }
    } else {
        $pfp = ''; // Manejar el caso cuando no se sube un archivo
    }

    if (checkEmailExistsForOtherUser($conn, $email, $user_id)) {
        echo "2";
    } else {
        if (updateUser($conn, $user_id, $password, $email, $pfp, $desc)) {
            $_SESSION['email'] = $email;
            $_SESSION['desc'] = $desc;
            session_commit();
            echo "0";
        } else {
            echo "1";
        }
    }
}

$conn->close();
ob_end_flush();
