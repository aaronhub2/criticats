async function getReviewsMovie(content_id, tipo) {
    try {
        const response = await $.ajax({
            url: '../scriptsphp/getReviewsCID.php',
            type: 'POST',
            data: { content_id: content_id },
            dataType: 'json'
        });

        const reviewsDiv = $("#reviewDiv");
        reviewsDiv.html('');

        if (response.length > 0) {
            for (let index = 0; index < response.length; index++) {
                const review = response[index];

                // Fetch user data
                const userResponse = await $.ajax({
                    url: '../scriptsphp/getUserID.php',
                    type: 'POST',
                    data: { user_id: review.User_ID },
                    dataType: 'json'
                });

                const user = JSON.parse(userResponse);
                const userName = user.name;
                const userPfp = user.profile_picture;

                // Append review HTML
                reviewsDiv.append(`
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-8 review shadow">
                            <div class="row d-flex reviewhead">
                                <div class="col-6 col-lg-4 order-1 text-start">
                                    <img id="pfp" src="${userPfp}" alt="Foto" class="text-start">
                                    <span class="text-center"><b>${userName}</b></span>
                                </div>
                                <div class="col-12 col-lg-4 order-3 order-lg-2 text-center">
                                    <h4>${review.Titulo}</h4>
                                </div>
                                <div class="col-6 col-lg-4 order-2 order-lg-3 text-end">
                                    <span>${review.rating}</span><img src="img/star.png" alt="star">
                                </div>
                            </div>
                            <div class="row">
                                <div class="card">
                                    <p class="text-start card-body">${review.text}</p>
                                </div>    
                            </div>
                            <div class="row reviewfoot">
                                <div class="col-3 col-md-2 col-xl-1 text-center text-md-start">
                                    <img src="img/comentario.png" alt="comment" class="commentButton" onclick="showComments(${index})">
                                    <span id="commentCount${index}">0</span>
                                </div>
                                <div class="col-3 col-md-2 col-xl-1 text-center text-md-start">
                                    <img src="img/me-gusta.png" alt="likeButton" class='likeButton' id='likeButton${index}' onclick='likeReview(${review.ID},${review.User_ID},${index})'>
                                    <span id="likeCount${index}">${review.likes}</span>
                                </div>
                                <div class="col-3 col-md-2 col-xl-1 text-center text-md-start">
                                    <img src="img/disgusto.png" alt="dislike" class='dislikeButton' id='dislikeButton${index}' onclick='dislikeReview(${review.ID},${review.User_ID},${index})'>
                                    <span id="dislikeCount${index}">${review.dislikes}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-2"></div>
                    </div>
                `);

                const commentsDiv = document.createElement('div');
                commentsDiv.setAttribute('id', 'commentsDiv' + index);
                reviewsDiv.append(commentsDiv);

                const currentUser_id = $('#currentUserID').attr('currentUserID');
                getComments(review.ID, index, userName, currentUser_id);
                getCommentCount(review.ID, index, function (commentCount, index) {
                    document.getElementById('commentCount' + index).innerText = commentCount;
                });

                // Check like status
                const likeStatus = await $.ajax({
                    url: '../scriptsphp/checkLikeStatus.php',
                    type: 'POST',
                    data: { review_id: review.ID }
                });

                if (likeStatus == 1) {
                    $('#likeButton' + index).attr('src', '/img/liked.png');
                    $('#likeButton' + index).attr('onclick', 'unLikeReview(' + review.ID + ',' + review.User_ID + ',' + index + ')');
                } else if (likeStatus == -1) {
                    $('#dislikeButton' + index).attr('src', '/img/disliked.png');
                    $('#dislikeButton' + index).attr('onclick', 'unDislikeReview(' + review.ID + ',' + review.User_ID + ',' + index + ')');
                }
            }
        } else {
            const movieInfo = await fetchMovieFromID(content_id, tipo);
            reviewsDiv.html(`<h4>Aún no hay reseñas para esta ${movieInfo.datos.title ? "película" : "serie"}.</h4>
                <p>Sea el primero en dejar una reseña para "${movieInfo.datos.title ? movieInfo.datos.title : movieInfo.datos.name}".</p>`);
        }
    } catch (error) {
        console.error("Error: " + error);
    }
}




async function getReviewsUser(user_id) {
    try {
        const response = await $.ajax({
            url: '../scriptsphp/getReviewsUID.php',
            type: 'POST',
            data: { user_id: user_id },
            dataType: 'json'
        });

        const reviewsDiv = $(".userBody");
        reviewsDiv.html('');

        if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
                const review = response[i];
                
                // Fetch movie data
                const movie = (await fetchMovieFromID(review.Content_ID, review.tipo)).datos;

                // Fetch user data
                const userResponse = await $.ajax({
                    url: '../scriptsphp/getUserID.php',
                    type: 'POST',
                    data: { user_id: review.User_ID },
                    dataType: 'json'
                });

                const user = JSON.parse(userResponse);
                const userName = user.name;
                const userPfp = user.profile_picture;

                // Append review HTML
                reviewsDiv.append(`
                    <div class="container">
                        <div class="reviewsTable">
                            <div class="row review mb-3 shadow">
                                <div class="movieTitle reviewRating ms-auto text-end">
                                    <h4 class="text-center">
                                        <span>${movie.title ? movie.title : movie.name} - </span> 
                                        <span>${review.rating} <img src="img/star.png" class="star-icon align-center" alt="Puntuación"></span>
                                    </h4>
                                </div>
                                <div class="col-12 col-lg-4 col-xl-3 poster mb-3 mb-lg-0 text-start">
                                    <a href="movie.php?id=${movie.id}&tipo=${review.tipo}"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid fixed-size-poster shadow" alt="Poster"></a>
                                </div>
                                <div class="col-12 col-lg-8 col-xl-9 reviewbody position-relative">
                                    <div>
                                        <div class="reviewTitle">
                                            <h4>${review.Titulo}</h4>
                                        </div>
                                        <div class="reviewText card">
                                            <p class="card-body">${review.text}</p>
                                        </div>
                                    </div>
                                    <div class="col-12 reviewInteractions d-flex justify-content-between align-items-center mt-3 mt-lg-auto">
                                        <div class="me-3 text-start">
                                            <img src="img/comentario.png" class="commentButton interaction-icon" alt="Comentarios"  onclick="showComments(${i})">
                                            <span id="commentCount${i}">0</span>
                                        </div>
                                        <div class="me-3 text-center">
                                            <img src="img/me-gusta.png" alt="likeButton" class='likeButton interaction-icon' id='likeButton${i}' onclick='likeReview(${review.ID},${review.User_ID},${i})'>
                                            <span id="likeCount${i}">${review.likes}</span>
                                        </div>
                                        <div class="me-3 text-center">
                                            <img src="img/disgusto.png" alt="dislike" class='dislikeButton interaction-icon' id='dislikeButton${i}' onclick='dislikeReview(${review.ID},${review.User_ID},${i})'>
                                            <span id="dislikeCount${i}">${review.dislikes}</span>
                                        </div>
                                        <div class="me-3 text-end">
                                            <img src="img/borrar.png" class="deleteButton interaction-icon" onclick="deleteReview(${review.ID},${user_id})" alt="borrar">
                                        </div>
                                    </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                const commentsDiv = document.createElement('div');
                commentsDiv.setAttribute('id', 'commentsDiv' + i);

                reviewsDiv.append(commentsDiv);
                getComments(review.ID, i, userName, user_id);
                getCommentCount(review.ID, i, function (commentCount, i) {
                    document.getElementById('commentCount' + i).innerText = commentCount;
                });

                // Check like status
                const likeStatus = await $.ajax({
                    url: '../scriptsphp/checkLikeStatus.php',
                    type: 'POST',
                    data: { review_id: review.ID }
                });

                if (likeStatus == 1) {
                    $('#likeButton' + i).attr('src', '/img/liked.png');
                    $('#likeButton' + i).attr('onclick', 'unLikeReview(' + review.ID + ',' + user_id + ',' + i + ')');
                } else if (likeStatus == -1) {
                    $('#dislikeButton' + i).attr('src', '/img/disliked.png');
                    $('#dislikeButton' + i).attr('onclick', 'unDislikeReview(' + review.ID + ',' + review.User_ID + ',' + i + ')');
                }
            }
        } else {
            reviewsDiv.html('<h4>Aun no has dejado ninguna reseña.</h4>');
        }
    } catch (error) {
        console.error("Error: " + error);
    }
}
