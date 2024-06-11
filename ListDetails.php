<?php
session_start(); // Start the session


if (isset($_SESSION['username'])) {
    $loggedInUser = $_SESSION['username'];
} else {
    $loggedInUser = null;
    header('Location:login.php');
}
$userPfp = $_SESSION['pfp'];

$listID = $_GET['id'];
$listTitle = $_GET['title'];
$listType = $_GET['tipo'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio - Criticats</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="shortcut icon" href="img/Criticatslogo.png" type="image/x-icon">
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/listDetails.css">
</head>

<body>
    <section class="container-fluid">
        <header class="row">
            <div class="col-6 text-start">
                <a href="index.php"><img src="img/Criticatslogo.png" id="headerlogo" alt="Criticats Logo"></a>
            </div>
            <div id="loginbutton" class="col-6 text-end">
                <?php
                if ($loggedInUser != null) {
                    echo "<a href='user.php'><span>$loggedInUser </span></a>";
                    echo '<a href="user.php"><img src="' . $userPfp . '" class="headerIcons shadow" alt="Foto de Perfil"></a>';
                } else {
                    echo '<a id="login" href="login.php"><span>Log In </span></a>';
                    echo '<a id="login" href="login.php"><img src="img/usericon.png" class="headerIcons shadow" alt="Foto de Perfil"></a>';
                }
                ?>
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

        <section class="row main">
            <button hidden list_id="<?php echo $listID ?>" list_type="<?php echo $listType ?>"
                id="hiddenButton"></button>
            <div class="header shadow text-center">
                <h1 id="listTitle">
                <span><?php echo $listTitle ?></span>
                <button type="button" class="btn btn-light" id="editarLista" list_title="<?php echo $listTitle ?>" list_id="<?php echo $listID ?>"><img src="img/editarLista.png" alt="editar lista"></button>
            </h1>
            </div>
            <div class="container" id="main">

            </div>
        </section>
    </section>

    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" role="dialog"
        aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirmación de Eliminación</h5>
                </div>
                <div class="modal-body">
                    ¿Estás seguro que quieres eliminar este elemento?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editListModal" tabindex="-1" role="dialog" aria-labelledby="editListModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editListModalLabel">Renombrar Lista</h5>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" id="newTitleInput" placeholder="Nuevo titulo" style="border: 1px solid #ced4da !important">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="saveNewTitle">Guardar</button>
            </div>
        </div>
    </div>
</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="lib/themoviedb.js"></script>
    <script src="scripts/fetchMovieFromID.js"></script>
    <script src="scripts/userLists.js"></script>
    <script src="scripts/showMoviesFromList.js"></script>
    <script src="scripts/search.js"></script>
    <script src="scripts/addItemToList.js"></script>
</body>

</html>