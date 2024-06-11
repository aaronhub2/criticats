function showMoviesFromList() {

    var listId = $('#hiddenButton').attr('list_id');
    var listType = parseInt($('#hiddenButton').attr('list_type'));

    // Configuración de la solicitud AJAX
    $.ajax({
        url: '../scriptsphp/getListItems.php',
        type: 'POST',
        data: { list_id: listId },
        success: function (data) {
            list = JSON.parse(data);

            $('#main').html('')
            list.forEach(movieID => {
                fetchMovieFromID(movieID, listType).then(movieInfo => {
                    if (movieInfo) {
                        movieInfo = movieInfo.datos;

                        if (listType == 0) {
                            $('#main').append(`<div class="movie shadow">
                                <a href='movie.php?id=${movieInfo.id}&tipo=0'><img src="https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}" alt="${movieInfo.title}"></a>
                                <div class="movie-title">${movieInfo.title}</div>
                                <img class="delete-icon" src="../img/borrar.png" alt="Borrar película" movie_id='${movieInfo.id}' list_id='${listId}' movie_name='${movieInfo.title}' id='removeFromListButton'>
                            </div>`);
                        } else if (listType == 1) {
                            $('#main').append(`<div class="movie">
                                <a href='movie.php?id=${movieInfo.id}&tipo=1'><img src="https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}" alt="${movieInfo.name}"></a>
                                <div class="movie-title">${movieInfo.name}</div>
                                <img class="delete-icon" src="../img/borrar.png" alt="Borrar película" movie_id='${movieInfo.id}' list_id='${listId}' movie_name='${movieInfo.name}' id='removeFromListButton'>
                            </div>`);
                        } else {
                            console.log('error');
                        }
                    } else {
                        console.log("error");
                    }
                }).catch(error => {
                    console.error('Fetch movie error:', error);
                });
            });


        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
};

$(document).ready(showMoviesFromList());