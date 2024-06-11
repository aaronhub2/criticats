<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Criticats</title>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'></script>
    <link rel="shortcut icon" href="img/CriticatsLogo.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel='stylesheet' href='styles/login.css'>
    <script src="scripts/login.js"></script>
</head>

<body>




    <section id='login-box' class="shadow">
        <div id='logo'> <a href="index.php"><img src='img/CriticatsLogo.png' alt='Criticats Logo'></a> </div>
        <div id="error"></div>


        <form action='index.php' id="loginForm" method='POST' class="text-center">
            <div class="form-floating mb-3">
                <input type="text" class="form-control text-input shadow" id="name"  name='name' placeholder="Nombre de usuario" >
                <label for="name">Nombre de usuario</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control  text-input shadow" id="password"  name='password' placeholder="Contraseña" >
                <label for="password">Contraseña</label>
            </div>
            <button class='form-button btn btn-outline-primary shadow' id='loginButton'>Iniciar Sesión</button><br><br>
            <span>¿No tienes cuenta? <a href="register.php">Registrate</a></span>
        </form>
    </section>
</body>

</html>