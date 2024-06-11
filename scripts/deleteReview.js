function deleteReview(reviewID, user_id){

    $('#confirmationModal .modal-body').html('¿Estás seguro de que deseas eliminar esta reseña?');
    $('#confirmationModal').modal('show');

    $('#confirmationModal').on('click', '[data-dismiss="modal"]', function () {
        $('#confirmationModal').modal('hide');
    });

    // Capturar el clic del botón de confirmar eliminar
    $('#confirmDelete').on('click', function () {
        $.ajax({
            url: "../scriptsphp/deleteReview.php",
            type: "POST",
            data: { review_id: reviewID },
            success: function (response) {
                if (response === "0") {
                    $('#confirmationModal').modal('hide');
                    $('#successModal .modal-body').html('se ha eliminado una reseña.');
                    $('#successModal .modal-title').html('Reseña eliminada con exito!');
                    $('#successModal').modal('show');
                    getReviewsUser(user_id);
                }
            },
            error: function (xhr, status, error) {
                console.log("Error en la solicitud AJAX: " + error);
            }
        });
    });
    $('#successModal').on('click', '[data-dismiss="modal"]', function () {
        $('#successModal').modal('hide');
    });
}