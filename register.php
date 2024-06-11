<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Registro - Criticats</title>
    <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
    <link rel="shortcut icon" href="img/CriticatsLogo.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel='stylesheet' href='styles/register.css'>
    <script src="scripts/validation.js"></script>
</head>

<body>
    <section id='login-box' class="shadow">
        <div id='logo'>
            <a href="login.php"><img src='img/CriticatsLogo.png' alt='Criticats Logo'></a>
            <div id="error"></div>
        </div>
        <form id='registrationForm' class="text-center">
            <div class="form-floating mb-3">
                <input type="text" class="form-control text-input shadow" id="name" name='name'
                    placeholder="Nombre de usuario">
                <label for="name">Nombre de usuario</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control text-input shadow" id="password" name='password'
                    placeholder="Contraseña">
                <label for="password">Contraseña</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control text-input shadow" id="passwordConfirm"
                    name='passwordConfirm' placeholder="Repetir contraseña">
                <label for="passwordConfirm">Repetir contraseña</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control text-input shadow" id="email"
                    name='email' placeholder="Correo electrónico">
                <label for="email">Correo electrónico</label>
            </div>
            <div class="form-floating mb-3">
                <input type="date" class="form-control text-input shadow" id="birthdate"
                    name='birthdate' placeholder="Fecha de nacimiento">
                <label for="birthdate">Fecha de nacimiento</label>
            </div>
            <button type='submit' class='form-button btn btn-outline-primary shadow' id='registerButton'>Registrate</button><br>
        </form>
    </section>
</body>

</html>