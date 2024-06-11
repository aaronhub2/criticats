$(document).ready(function () {
    //$('#login-box').height('22rem');

    $('#loginForm').submit(function (event) {
        event.preventDefault();
        var name = $('#name').val();
        var password = $('#password').val();


        $.ajax({
            type: 'POST',
            url: 'scriptsphp/loginUser.php',
            data: {
                name: name,
                password: password
            },
            success: function (response) {
                if (response.trim() === "oki") {
                    $('#login-box').animate({ height: '36rem' });
                    error.innerHTML = '<div id="alerta" class="alert alert-success">Inicio de Sesión Correcto!</div>';
                    setTimeout(function () {
                        window.location.href = 'index.php';
                    }, 2000);
                } else {
                    $('#login-box').animate({height: '36rem'});
                    error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>Usuario o contraseña incorrectos</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';

                    $('#dismiss').click(function () {
                        $('#alerta').remove();
                        $('#login-box').animate({height: '30rem'});
                    });
                }
            },
            error: function (xhr, status, error) {
                // Handle error cases if needed
                setTimeout(function () {
                    window.location.href = 'login.php';
                }, 500);
            }
        });
    });
});