function showComments(param = {}) {
    index = JSON.stringify(param);

    $('#commentsModal' + index).modal('show')

}

function getCommentCount(review_id, index, callback) {
    $.ajax({
        url: '../scriptsphp/getCommentCount.php',
        type: 'POST',
        data: {
            review_id: review_id
        },
        success: function (response) {
            // Llama al callback con el valor de respuesta
            callback(response, index);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + error);
        }
    });
}



function getComments(review_id, index, userName, currentUser_id) {

    $.ajax({
        url: '../scriptsphp/getReviewFromID.php',
        type: 'POST',
        data: { review_id: review_id },
        dataType: 'json',
    }).then(function (review) {
        $.ajax({
            url: '../scriptsphp/getComments.php',
            type: 'POST',
            data: { review_id: review_id },
            dataType: 'json',
        }).then(function (comments) {
            $('#commentsDiv' + index).html("");


            if (!(Object.keys(comments).length === 0)) {
                let commentsHtml = '';

                comments.forEach(function (comment) {
                    $.ajax({
                        url: '../scriptsphp/getUserID.php',
                        type: 'POST',
                        data: { user_id: comment.User_ID },
                        dataType: 'json',
                    }).then(function (responseUser) {
                        user = JSON.parse(responseUser)

                        commentsHtml += `<!-- Comentario -->
                                <div class="card mb-3">
                                <div class="card-body">
                                    <div class="comment text-start d-flex justify-content-between align-items-center">
                                        <div class="user-info d-flex align-items-center">
                                            <img src="${user.profile_picture}" class="profile-pic" alt="Foto de perfil" title="${user.name}" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
                                        </div>
                                        <div class="comment-text container text-start">
                                            <p class="card-text comment-text">${comment.text}</p>
                                        </div>
                                        ${currentUser_id == comment.User_ID ? '<img src="img/borrar.png" alt="borrar" class="deleteButton" comment_id="' + comment.ID + '">' : ''}
                                    </div>
                                </div>
                            </div>
                                    <!-- Fin de Comentario -->`;

                        $('#commentsDiv' + index).html(`
                                        <!-- Modal de comentarios -->
                                        <div class="modal fade" id="commentsModal${index}" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="commentModalLabel">Comentarios - Reseña de ${userName}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="comment-container">
                                                            ${commentsHtml}
                                                        </div>
                                                        <!-- Formulario para añadir nuevo comentario -->
                                                        <form id="commentForm${index}" class="fixed-bottom" method="POST">
                                                            <div class="form-group">
                                                                <label for="comment">Añade un comentario</label>
                                                                <textarea maxlength="200" id="commentInput${index}" placeholder="Tu comentario..." class="form-control" id="comment" rows="2" required></textarea>
                                                            </div>
                                                            <button type="submit" class="btn btn-primary">Enviar comentario</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `);

                        $('.deleteButton').click(function () {
                            commentID = $(this).attr('comment_id');
                            $.ajax({
                                url: '../scriptsphp/deleteComment.php',
                                type: 'POST',
                                data: { commentID: commentID },
                            }).then(function (response) {
                                if (response) {
                                    getComments(review_id, index, userName, currentUser_id)
                                    $('#commentsModal' + index).modal('hide')
                                    getCommentCount(review_id, index, function (commentCount, index) {
                                        document.getElementById('commentCount' + index).innerText = commentCount;
                                    });
                                }
                            })
                        })

                        $('#commentForm' + index).on('submit', function (event) {
                            event.preventDefault();

                            newComment = $('#commentInput' + index).val()

                            $.ajax({
                                url: '../scriptsphp/addComent.php',
                                type: 'POST',
                                data: {
                                    review_id: review_id,
                                    text: newComment
                                },
                                success: function (response) {
                                    if (response == 1) {
                                        getComments(review_id, index, userName, currentUser_id)
                                        $('#commentsModal' + index).modal('hide')
                                        getCommentCount(review_id, index, function (commentCount, index) {
                                            // Utiliza el valor del recuento de comentarios aquí
                                            document.getElementById('commentCount' + index).innerText = commentCount;
                                        });
                                    } else {
                                        console.log(response)
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.error("Error: " + error);
                                }
                            })
                        })
                    })
                });


            } else {
                commentsHtml = "<h6>Aun no hay comentarios para esta reseña</h6><p>Añade un comentario...</p>"

                $('#commentsDiv' + index).html(`
                    <!-- Modal de comentarios -->
                    <div class="modal fade" id="commentsModal${index}" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="commentModalLabel">Comentarios - Reseña de ${userName}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="comment-container">
                                        ${commentsHtml}
                                    </div>
                                    <!-- Formulario para añadir nuevo comentario -->
                                    <form id="commentForm${index}" class="fixed-bottom" method="POST">
                                        <div class="form-group">
                                            <label for="comment">Añade un comentario</label>
                                            <textarea id="commentInput${index}" placeholder="Tu comentario..." class="form-control" id="comment" rows="2" required></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Enviar comentario</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                $('#commentForm' + index).on('submit', function (event) {
                    event.preventDefault();

                    newComment = $('#commentInput' + index).val()

                    $.ajax({
                        url: '../scriptsphp/addComent.php',
                        type: 'POST',
                        data: {
                            review_id: review_id,
                            text: newComment
                        },
                        success: function (response) {
                            if (response == 1) {
                                getComments(review_id, index, userName, currentUser_id)
                                $('#commentsModal' + index).modal('hide')
                                getCommentCount(review_id, index, function (commentCount, index) {
                                    // Utiliza el valor del recuento de comentarios aquí
                                    document.getElementById('commentCount' + index).innerText = commentCount;
                                });
                            } else {
                                console.log(response)
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error: " + error);
                        }
                    })
                })
            }

        })
    })
}


