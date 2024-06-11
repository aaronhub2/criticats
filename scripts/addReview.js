function saveReview(attr = {}) {

    if (attr.index != undefined) index = attr.index;
    else index = '';

    var reviewTitle = $('#reviewTitle' + index).val();
    var content_id = $('#content_id' + index).val();
    var tipo = $('#tipo' + index).val();
    var reviewText = $('#reviewText' + index).val();
    var rating = $('input[name="rating' + index + '"]:checked').val();

    // Send an AJAX request to the server
    $.ajax({
        type: 'POST',
        url: 'scriptsphp/addReview.php',
        data: {
            title: reviewTitle,
            text: reviewText,
            rating: rating,
            content_id: content_id,
            tipo: tipo
        },
        success: function (response) {
            // Handle the response from the server
            if (response == "0") {
                $('#reviewModal'+index).modal('hide');
                $('#successModal').modal('show');
                console.log(index)
                if (attr.index != undefined) {
                    setTimeout(function () {
                        window.location.href = "movie.php?id=" + content_id + "&tipo=" + tipo;
                    }, 1000);

                } else {
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            } else {
                $('#errorModal').modal('show');
            }
        },
        error: function (xhr, status, error) {
            // Handle error cases if needed
            console.error(xhr.responseText);
        }
    });

    $('#successModal').on('click', '[data-dismiss="modal"]', function () {
        $('#successModal').modal('hide');
    });
    $('#errorModal').on('click', '[data-dismiss="modal"]', function () {
        $('#errorModal').modal('hide');
    });
}

