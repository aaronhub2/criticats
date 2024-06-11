// LIKES
function likeReview(reviewID, userID, index) {
    if ($('#dislikeButton' + index).attr('src') == '/img/disliked.png') {
        let value = 0;

        $.ajax({
            url: '../scriptsphp/dislikes.php',
            type: 'POST',
            data: {
                review_id: reviewID,
                value: value
            },
            success: function (response) {
                if (response == "0") {
                    $('#dislikeButton' + index).attr('src', '/img/disgusto.png');
                    $('#dislikeButton' + index).attr('onclick', 'dislikeReview(' + reviewID + ',' + userID + ',' + index + ')');
                    $('#dislikeCount' + index).html(parseInt($('#dislikeCount' + index).html()) - 1);
                    addLike(reviewID, userID, index); // Añadir el "like" después de eliminar el "dislike"
                } else {
                    console.log("Error en la operación");
                }
            },
            error: function () {
                console.log("Error en la solicitud");
            }
        });
    } else {
        addLike(reviewID, userID, index); // Añadir el "like" directamente si no hay "dislike"
    }
}

function addLike(reviewID, userID, index) {
    let value = 1;

    $.ajax({
        url: '../scriptsphp/likes.php',
        type: 'POST',
        data: {
            review_id: reviewID,
            value: value
        },
        success: function (response) {
            if (response == "0") {
                $('#likeButton' + index).attr('src', '/img/liked.png');
                $('#likeButton' + index).attr('onclick', 'unLikeReview(' + reviewID + ',' + userID + ',' + index + ')');
                $('#likeCount' + index).html(parseInt($('#likeCount' + index).html()) + 1);
            } else {
                console.log("Error en la operación");
            }
        },
        error: function () {
            console.log("Error en la solicitud");
        }
    });
}

function unLikeReview(reviewID, userID, index) {
    let value = 0;

    $.ajax({
        url: '../scriptsphp/likes.php',
        type: 'POST',
        data: {
            review_id: reviewID,
            value: value
        },
        success: function (response) {
            if (response == "0") {
                $('#likeButton' + index).attr('src', '/img/me-gusta.png');
                $('#likeButton' + index).attr('onclick', 'likeReview(' + reviewID + ',' + userID + ',' + index + ')');
                $('#likeCount' + index).html(parseInt($('#likeCount' + index).html()) - 1);
            } else {
                console.log("Error en la operación");
            }
        },
        error: function () {
            console.log("Error en la solicitud");
        }
    });
}

// DISLIKES
function dislikeReview(reviewID, userID, index) {
    if ($('#likeButton' + index).attr('src') == '/img/liked.png') {
        let value = 0;

        $.ajax({
            url: '../scriptsphp/likes.php',
            type: 'POST',
            data: {
                review_id: reviewID,
                value: value
            },
            success: function (response) {
                if (response == "0") {
                    $('#likeButton' + index).attr('src', '/img/me-gusta.png');
                    $('#likeButton' + index).attr('onclick', 'likeReview(' + reviewID + ',' + userID + ',' + index + ')');
                    $('#likeCount' + index).html(parseInt($('#likeCount' + index).html()) - 1);
                    addDislike(reviewID, userID, index); // Añadir el "dislike" después de eliminar el "like"
                } else {
                    console.log("Error en la operación");
                }
            },
            error: function () {
                console.log("Error en la solicitud");
            }
        });
    } else {
        addDislike(reviewID, userID, index); // Añadir el "dislike" directamente si no hay "like"
    }
}

function addDislike(reviewID, userID, index) {
    let value = -1;

    $.ajax({
        url: '../scriptsphp/dislikes.php',
        type: 'POST',
        data: {
            review_id: reviewID,
            value: value
        },
        success: function (response) {
            if (response == "0") {
                $('#dislikeButton' + index).attr('src', '/img/disliked.png');
                $('#dislikeButton' + index).attr('onclick', 'unDislikeReview(' + reviewID + ',' + userID + ',' + index + ')');
                $('#dislikeCount' + index).html(parseInt($('#dislikeCount' + index).html()) + 1);
            } else {
                console.log("Error en la operación");
            }
        },
        error: function () {
            console.log("Error en la solicitud");
        }
    });
}

function unDislikeReview(reviewID, userID, index) {
    let value = 0;

    $.ajax({
        url: '../scriptsphp/dislikes.php',
        type: 'POST',
        data: {
            review_id: reviewID,
            value: value
        },
        success: function (response) {
            if (response == "0") {
                $('#dislikeButton' + index).attr('src', '/img/disgusto.png');
                $('#dislikeButton' + index).attr('onclick', 'dislikeReview(' + reviewID + ',' + userID + ',' + index + ')');
                $('#dislikeCount' + index).html(parseInt($('#dislikeCount' + index).html()) - 1);
            } else {
                console.log("Error en la operación");
            }
        },
        error: function () {
            console.log("Error en la solicitud");
        }
    });
}
