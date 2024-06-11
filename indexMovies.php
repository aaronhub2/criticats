<?php
session_start(); // Start the session


if (isset($_SESSION['username'])) {
    $loggedInUser = $_SESSION['username'];
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
    <title>Peliculas - Criticats</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="img/Criticatslogo.png" type="image/x-icon">
    <link rel="stylesheet" href="styles/index.css">
    <script src="lib/themoviedb.js"></script>
    <script src="scripts/getLists.js"></script>
    <script src="scripts/scrollpelis.js"></script>
    <script src="scripts/logout.js"></script>
    <script src="scripts/login.js"></script>
    <script src="scripts/addItemToList.js"></script>
    <script src="scripts/search.js"></script>
    <script src="scripts/getReviewAVG.js"></script>
    <script src="scripts/addReview.js"></script>
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
                        <a class="nav-link"  href="indexMovies.php">Peliculas</a>
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
            <div class="col-1"></div>
            <div id="scroll" class="col-10">

            </div>
            <div class="col-1"></div>
        </section>
    </section>

     <!-- Modal de éxito -->
     <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="successModalLabel">Reseña creada!</h5>
                </div>
                <div class="modal-body">
                    La reseña se ha creado con éxito.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de error -->
    <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="errorModalLabel">Error al crear la reseña.</h5>
                </div>
                <div class="modal-body">
                    Hubo un error al intentar crear la reseña. Por favor, inténtalo de nuevo.
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