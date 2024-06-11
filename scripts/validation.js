$(document).ready(function () {
    const NamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
    const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const EmailPattern = /^(.+)@(\S+)$/;


    function validarFecha(fecha) {
        var fechaInput = new Date(fecha);
        var today = new Date();

        if (fechaInput >= today) {
            return false;
        } else {
            return true;


        }
    }

    $('#registrationForm').submit(function (event) {
        event.preventDefault();
        var name = $('#name').val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();
        var email = $('#email').val();
        var birthdate = $('#birthdate').val();

        if (name == '' || password == '' || passwordConfirm == '' || email == '' || birthdate == '') {
            $('#login-box').animate({ height: '46rem' });
            error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>No puede haber campos vacios.</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
        } else if (!NamePattern.test(name)) {
            $('#login-box').animate({ height: '46rem' });
            error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>Formato de nombre inválido. Usa solo letras, números, guiones bajos (_) o guiones (-), y entre 3 y 16 caracteres.</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
        } else if (password != passwordConfirm) {
            $('#login-box').animate({ height: '46rem' });
            error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>Las contraseñas no coinciden.</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
        } else if (!PasswordPattern.test(password)) {
            $('#login-box').animate({ height: '46rem' });
            error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>La contraseña debe tener al menos 8 caracteres e incluir al menos una letra mayúscula, una letra minúscula y un número.</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
        } else if (!EmailPattern.test(email)) {
            $('#login-box').animate({ height: '46rem' });
            error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>Formato de correo electrónico inválido (ejemplo: usuario@example.com).</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
        } else if (!validarFecha(birthdate)) {
            $('#login-box').animate({ height: '46rem' });
            error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>Fecha de nacimiento no válida.</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
        } else {

            $.ajax({
                type: 'POST',
                url: 'scriptsphp/registerUser.php',
                data: {
                    name: name,
                    password: password,
                    email: email,
                    birthdate: birthdate
                },
                success: function (response) {
                    if (response == 0) {
                        $('#login-box').animate({ height: '46rem' });
                        error.innerHTML = '<div id="alerta" class="alert alert-success">Registro Correcto!</div>';
                        setTimeout(function () {
                            window.location.href = 'login.php';
                        }, 2000);
                    } else if(response == 1){
                        $('#login-box').animate({ height: '46rem' });
                        error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>El usuario ya existe</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
                    }else if(response == 2){
                        $('#login-box').animate({ height: '46rem' });
                        error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>El correo electrónico esta en uso</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
                    }else{
                        $('#login-box').animate({ height: '46rem' });
                        error.innerHTML = '<div id="alerta" class="alert alert-danger alert-dismissible"><div>Error inesperado</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>';
                    }
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }
        $('#dismiss').click(function () {
            $('#alerta').remove();
            $('#login-box').animate({ height: '41rem' });
        });
    });
});

/*0 bien / 1 user existe / 2 mail existe*/ 