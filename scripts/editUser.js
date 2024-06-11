$(document).ready(function () {
    const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const EmailPattern = /^(.+)@(\S+)$/;

    $('#updateForm').submit(function (event) {
        event.preventDefault();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();
        var email = $('#email').val();
        var desc = $('#desc').val();
        var pfp = $('#pfpInput')[0].files[0];
        var error = $('#error');


        if (password || passwordConfirm) {
            if (password != passwordConfirm) {
                $('#login-box').animate({ height: '50rem' });
                error.html('<div id="alerta" class="alert alert-danger alert-dismissible"><div>Las contraseñas no coinciden.</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>');
            } else if (!PasswordPattern.test(password)) {
                $('#login-box').animate({ height: '53rem' });
                error.html('<div id="alerta" class="alert alert-danger alert-dismissible"><div>La contraseña debe tener al menos 8 caracteres e incluir al menos una letra mayúscula, una letra minúscula y un número.</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>');
            }
        } else if (!EmailPattern.test(email)) {
            $('#login-box').animate({ height: '53rem' });
            error.html('<div id="alerta" class="alert alert-danger alert-dismissible"><div>Formato de correo electrónico inválido (ejemplo: usuario@example.com).</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>');
        } else {
            var formData = new FormData();
            formData.append('password', password);
            formData.append('email', email);
            formData.append('pfp', pfp);
            formData.append('desc', desc);

            $.ajax({
                type: 'POST',
                url: 'scriptsphp/editUser.php',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if (response == 0) {
                        $('#login-box').animate({ height: '50rem' });
                        error.html('<div id="alerta" class="alert alert-success">Se han guardado los cambios!</div>');
                        setTimeout(function () {
                            window.location.href = 'user.php';
                        }, 2000);
                    } else if (response == 2) {
                        $('#login-box').animate({ height: '50rem' });
                        error.html('<div id="alerta" class="alert alert-danger alert-dismissible"><div>El correo electrónico esta en uso</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>');
                    } else {
                        $('#login-box').animate({ height: '50rem' });
                        error.html('<div id="alerta" class="alert alert-danger alert-dismissible"><div>Error inesperado</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="dismiss"></button></div>');
                    }
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }
        $('#dismiss').click(function () {
            $('#alerta').remove();
            $('#login-box').animate({ height: '47rem' });
        });
    });
});
