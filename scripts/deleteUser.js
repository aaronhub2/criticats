$(document).ready(function () {
    $('#deleteUserButton').click(function () {
        var userId = $('#loginButton').attr('user_id');
        console.log(userId)

        $('#confirmationModal .modal-body').html('¿Estás seguro de que deseas eliminar tu usuario?');
        $('#confirmationModal').modal('show');

        $('#confirmationModal').on('click', '[data-dismiss="modal"]', function () {
            $('#confirmationModal').modal('hide');
        });

        $('#confirmDeleteButton').click(function () {
            $.ajax({
                type: 'POST',
                url: 'scriptsphp/deleteUser.php',
                data: { userId: userId }, // Enviar el ID del usuario al script PHP
                success: function (response) {
                    console.log(response)
                    if (response == 0) {
                        $('#successDeleteModal').modal('show');
                        setTimeout(function () {
                            window.location.href = 'login.php'; 
                        }, 2000);
                    } else {
                        console.log('error')
                    }
                },
                error: function (xhr, status, error) {
                    console.log(error);
                    // Manejar el error de la petición
                }
            });
        })

    });
});