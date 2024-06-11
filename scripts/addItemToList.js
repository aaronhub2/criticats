function addItemToList(button, contentId) {
    let listId = $(button).attr('list_id');

    fetch('../scriptsphp/addItemToList.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `list_id=${encodeURIComponent(listId)}&content_id=${encodeURIComponent(contentId)}`
    })
        .then(response => response.text())
        .then(result => {
            result = result.trim();
            if (result === '0') {
                $(button).tooltip({
                    title: 'Añadido con éxito!',
                    placement: 'top',
                    trigger: 'manual'
                }).tooltip('show');
                setTimeout(function () {
                    $(button).tooltip('dispose');
                }, 2000);
            } else if (result === '1') {
                $(button).tooltip({
                    title: 'El contenido ya esta en la lista',
                    placement: 'top',
                    trigger: 'manual'
                }).tooltip('show');
                setTimeout(function () {
                    $(button).tooltip('dispose');
                }, 2000);
            } else {
                $(button).tooltip({
                    title: 'Error al añadir :(',
                    placement: 'top',
                    trigger: 'manual'
                }).tooltip('show');
                setTimeout(function () {
                    $(button).tooltip('dispose');
                }, 2000);
            }
        })
        .catch(error => console.error('Error:', error));
}


$(document).ready(function () {

    $('#main').on('click', '.delete-icon', function () {
        var listId = $(this).attr('list_id'); // Obtener el ID de la lista del botón
        var contentId = $(this).attr('movie_id'); // Obtener el ID de la película del botón
        var movieName = $(this).attr('movie_name'); // Obtener el ID de la película del botón

        // Abrir el modal de confirmación
        $('#deleteConfirmationModal .modal-body').html('¿Estás seguro de que deseas eliminar <strong>' + movieName + '</strong> de esta lista?');
        $('#deleteConfirmationModal').modal('show');
        $('#deleteConfirmationModal').on('click', '[data-dismiss="modal"]', function() {
            $('#deleteConfirmationModal').modal('hide');
        });

        $('#confirmDeleteBtn').off('click');

        // Cuando el usuario confirme la eliminación
        $('#confirmDeleteBtn').on('click', function () {
            fetch('../scriptsphp/deleteItemFromList.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `list_id=${encodeURIComponent(listId)}&content_id=${encodeURIComponent(contentId)}`
            })
                .then(response => response.text())
                .then(result => {
                    if (result === '0') {
                        showMoviesFromList(); // Actualizar la lista de películas
                    } else {
                        console.log('error');
                    }
                })
                .catch(error => console.error('Error:', error));

            // Cerrar el modal después de la confirmación
            $('#deleteConfirmationModal').modal('hide');
        });
    });

});
