<?php
session_start(); // Start the session


if (isset($_SESSION['username'])) {
    $loggedInUser = $_SESSION['username'];
    $email = $_SESSION['email'];
    $desc = $_SESSION['desc'];
} else {
    $loggedInUser = null;
    header('Location:login.php');
}
$userPfp = $_SESSION['pfp'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil - Criticats</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="img/Criticatslogo.png" type="image/x-icon">
    <link rel="stylesheet" href="styles/index.css">
    <script src="lib/themoviedb.js"></script>
    <link rel="stylesheet" href="styles/register.css">
    <link rel="stylesheet" href="styles/editUser.css">
    <script src="scripts/editUser.js"></script>
    <script src="scripts/deleteUser.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</head>

<body>
    <section class="container-fluid">
        <header class="row">
            <div class="col-6 text-start">
                <a href="index.php"><img src="img/Criticatslogo.png" id="headerlogo" alt="Criticats Logo"></a>
            </div>
            <div id="loginButton" class="col-6 text-end" user_id="<?php echo $_SESSION['user_id'] ?>">
                <a href='user.php'><span><?php echo $loggedInUser ?> </span></a>
                <a href="user.php"><img src="<?php echo $userPfp ?>" class="headerIcons shadow" alt="Foto de Perfil"></a>
            </div>
        </header>

        <nav class="row navbar navbar-expand-lg bg-body-tertiary" style="background-color: #4682B4 !important;">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation" id="sandwich">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.php">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="indexMovies.php">Peliculas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="indexSeries.php">Series</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <select name="searchfilter" id="select" class="form-select">
                        <option value="Peliculas">Peliculas</option>
                        <option value="Series">Series</option>
                    </select>
                    <input class="form-control me-2" name="search" type="search" placeholder="Buscar..." aria-label="Search" id="search">
                    <button class="btn btn-danger" type="submit" id="searchbtn">Buscar</button>
                </form>
            </div>
        </nav>

        <section class="row main justify-content-center">
            <h2>Editar Perfil</h2>
            <section id='login-box' class="shadow">
                <div id='pfp'>
                    <a href="user.php"><img src='<?php echo $userPfp ?> ' alt="Foto de Perfil"></a>
                    <div id="error"></div>
                </div>
                <form id='updateForm' class="text-center" enctype="multipart/form-data">
                    <div class="form-floating mb-3">
                        <input readonly type="text" class="form-control text-input shadow" id="name" name='name'
                            placeholder="Nombre de usuario" value="<?php echo $loggedInUser; ?>">
                        <label for="name">Nombre de usuario</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control text-input shadow" id="desc" name='desc'
                            placeholder="Nueva descripcion."><?php echo $desc ?></textarea>
                        <label for="desc">Nueva descripción</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control text-input shadow" id="password" name='password'
                            placeholder="Contraseña">
                        <label for="password">Nueva contraseña</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control text-input shadow" id="passwordConfirm"
                            name='passwordConfirm' placeholder="Repetir nueva contraseña">
                        <label for="passwordConfirm">Repetir nueva contraseña</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control text-input shadow" id="email" name='email'
                            placeholder="Correo electrónico" value="<?php echo $email ?>">
                        <label for="email">Correo electrónico</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="file" class="form-control text-input shadow" id="pfpInput" name='pfpInput'
                            placeholder="Nueva foto de perfil" accept="image/*">
                        <label for="pfpInput">Nueva foto de perfil</label>
                    </div>
                    <button type='submit' class='form-button btn btn-outline-primary shadow' id='registerButton'>Guardar
                        Cambios</button><br>
                </form>
                <button class='btn btn-danger shadow' id='deleteUserButton'>Eliminar Usuario</button><br>
            </section>
        </section>
    </section>

    <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog"
        aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar eliminación</h5>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que quieres eliminar este usuario?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteButton">Eliminar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="successDeleteModal" tabindex="-1" role="dialog"
        aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmDeleteModalLabel">Usuario Eliminado!</h5>
                </div>
                <div class="modal-body">
                    Se ha confirmado la eliminación del usuario
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <script src="scripts/search.js"></script>
</body>

</html>