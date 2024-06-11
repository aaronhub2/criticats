function mostrarListas(listas) {
    const movieTableBody = document.getElementById("movieListTableBody");
    const seriesTableBody = document.getElementById("seriesListTableBody");

    movieTableBody.innerHTML = '';
    seriesTableBody.innerHTML = '';

    const movieListas = listas.filter(lista => lista.Tipo === 0);
    const seriesListas = listas.filter(lista => lista.Tipo === 1);

    if (movieListas.length === 0) {
        movieTableBody.innerHTML = '<tr><td>Aun no hay listas.</td></tr>';
    } else {
        movieListas.forEach(lista => {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.innerHTML = `<a href='listDetails.php?id=${lista.ID}&title=${lista.title}&tipo=${lista.Tipo}' class='listTitle'>${lista.title}</a>
    <div id="listButtons">
        <img src="img/borrar.png" alt="borrar" class="removeList deleteButton" list_id='${lista.ID}' list_name='${lista.title}'>
    </div>`;
            row.appendChild(cell);
            movieTableBody.appendChild(row);
        });
    }

    if (seriesListas.length === 0) {
        seriesTableBody.innerHTML = '<tr><td>Aun no hay listas.</td></tr>';
    } else {
        seriesListas.forEach(lista => {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.innerHTML = `<a href='listDetails.php?id=${lista.ID}&title=${lista.title}&tipo=${lista.Tipo}' class='listTitle'>${lista.title}</a>
    <div id="listButtons">
        <img src="img/borrar.png" alt="borrar" class="removeList" list_id='${lista.ID}' list_name='${lista.title}'>
    </div>`;
            row.appendChild(cell);
            seriesTableBody.appendChild(row);
        });
    }
}


function addNewList(tipo, userID) {
    $.ajax({
        url: "../scriptsphp/createList.php",
        type: "POST",
        data: {
            tipo: tipo,
            user_id: userID
        },
        success: function (response) {
            if (response === "0") {
                $('#successModal').modal('show');
                getListsUser();
            } else {
                $('#errorModal').modal('show');
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            $('#errorModal').modal('show');
        }
    });

    $('#successModal').on('click', '[data-dismiss="modal"]', function () {
        $('#successModal').modal('hide');
    });
    $('#errorModal').on('click', '[data-dismiss="modal"]', function () {
        $('#errorModal').modal('hide');
    });
}


$(document).on('click', '.removeList', function () {
    var listID = $(this).attr('list_id');
    var listName = $(this).attr('list_name');


    // Mostrar el modal de confirmación con el nombre de la lista
    $('#confirmationModal .modal-body').html('¿Estás seguro de que deseas eliminar la lista <strong>' + listName + '</strong>?');
    $('#confirmationModal').modal('show');

    $('#confirmationModal').on('click', '[data-dismiss="modal"]', function () {
        $('#confirmationModal').modal('hide');
    });

    // Capturar el clic del botón de confirmar eliminar
    $('#confirmDelete').on('click', function () {
        $.ajax({
            url: "../scriptsphp/deleteList.php",
            type: "POST",
            data: { listID: listID },
            success: function (response) {
                if (response === "0") {
                    $('#confirmationModal').modal('hide');
                    $('#deleteSuccessModal').modal('show');
                    getListsUser();
                }
            },
            error: function (xhr, status, error) {
                console.log("Error en la solicitud AJAX: " + error);
            }
        });
    });
});

// Limpiar el evento de clic del botón de confirmar eliminar al cerrar el modal de confirmación
$('#confirmationModal').on('hidden.bs.modal', function () {
    $('#confirmDelete').off('click');
});

$(document).ready(function () {
    var listTitle, listID;

    $('#editarLista').click(function () {
        listTitle = $(this).attr('list_title');
        listID = $(this).attr('list_id');

        // Muestra el modal
        $('#editListModal').modal('show');
        $('#editListModal').on('click', '[data-dismiss="modal"]', function () {
            $('#editListModal').modal('hide');
        });
    
    });

    $('#saveNewTitle').click(function () {
        var newTitle = $('#newTitleInput').val().trim(); // Trim para eliminar espacios en blanco al inicio y al final

        if (newTitle !== "") { // Comprobar si el nuevo título no está vacío
            $.ajax({
                url: '../scriptsphp/renameList.php', 
                type: 'POST',
                data: {
                    listID: listID,
                    newTitle: newTitle
                },
                success: function (response) {
                    if (response == "0") {
                        $('#listTitle span').html(newTitle);
                    } else {
                        alert('La lista ya tiene ese nombre.');
                    }
                    // Cierra el modal después de guardar
                    $('#editListModal').modal('hide');
                },
                error: function (xhr, status, error) {
                    console.error('AJAX Error: ' + status + error);
                }
            });
        } else {
            alert('El título no puede estar vacío.');
        }
    });
});
