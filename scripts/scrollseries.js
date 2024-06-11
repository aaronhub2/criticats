theMovieDb.common.api_key = 'c260b3e8954b170aed328ca4288bd341';
function exitoRecogiendoSerie(data) {
    var movies = data.results;

    //div que engloba todas las peliculas
    var movieDetailsDiv = document.getElementById('scroll');

    movies.forEach((movie, index) => {
        if (movie.overview && movie.poster_path) {

            getReviewAVG(movie.id).then(function (data) {
                data = Math.trunc(data);
                avg = data ? data : 0;
                //Div de cada pelicula
                var movieDiv = document.createElement('div');
                movieDiv.classList.add('row');
                movieDiv.classList.add('shadow');
                movieDiv.classList.add('rounded');
                movieDiv.classList.add('text-center');
                movieDiv.classList.add('text-sm-center');
                movieDiv.classList.add('text-md-center');
                movieDiv.classList.add('text-lg-start');
                movieDiv.classList.add('text-xl-start');
                movieDiv.classList.add('movie');

                //div del poster de la pelicula
                var movieDivPoster = document.createElement('div');
                movieDivPoster.classList.add('col-12');
                movieDivPoster.classList.add('col-md-12');
                movieDivPoster.classList.add('col-lg-4');
                movieDivPoster.classList.add('col-xl-3');
                movieDivPoster.classList.add('poster');

                //Div del resto de la info de la pelicula, a su vez separado en otras 2 filas
                var movieDivBody = document.createElement('div');
                var movieDivTitle = document.createElement('div');
                var movieDivRatings = document.createElement('div')

                movieDivBody.classList.add('col-12');
                movieDivBody.classList.add('col-lg-8');
                movieDivBody.classList.add('col-xl-9');
                movieDivTitle.classList.add('row');
                movieDivTitle.classList.add('movieTitle');
                movieDivRatings.classList.add('row');

                //obtiene el poster de la api
                var posterLink = document.createElement('a');
                posterLink.href = 'movie.php?id=' + movie.id + '&tipo=1';
                var poster = document.createElement('img');
                poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                poster.alt = movie.name;
                poster.id = "posterPeli";
                posterLink.appendChild(poster);

                //obtiene titulo, año y descripcion de la api
                var tituloPeli = document.createElement('h2');
                var year = movie.first_air_date.substring(0, 4);
                tituloPeli.textContent = movie.name + ' (' + year + ')';
                movieDivTitle.appendChild(tituloPeli);


                var descripcion = document.createElement('div');
                
                movieDivTitle.appendChild(descripcion);

                descripcion.innerHTML = `
                <button id="toggleButton${index}" class="btn btn-outline-secondary d-lg-none">Mostrar descripcion</button>
                <div id="responsiveContent${index}" class="d-none d-lg-block text-start">
                    ${movie.overview}
                </div>
            `;

                //fila del texto "Valoraciones"
                var ratingsText = document.createElement('div');
                ratingsText.classList.add('row');

                var ratingsTextText = document.createElement('div');
                ratingsTextText.classList.add('col-12');
                ratingsTextText.classList.add('col-lg-4');
                ratingsTextText.classList.add('col-xl-4');

                var ratingsTextFill = document.createElement('div');
                ratingsTextFill.classList.add('col-0');
                ratingsTextFill.classList.add('col-lg-8');
                ratingsTextFill.classList.add('col-xl-8');

                var h4 = document.createElement('h4');
                h4.innerHTML += 'Valoraciones';
                ratingsTextText.appendChild(h4);

                ratingsText.appendChild(ratingsTextText);
                ratingsText.appendChild(ratingsTextFill);
                movieDivRatings.appendChild(ratingsText);

                //fila de la puntuacion de las valoraciones y los botones, a su vez separada en varias columnas
                var rowreview = document.createElement('div');
                rowreview.classList.add('row');
                rowreview.classList.add('align-bottom');

                //puntuacion global
                var globalRating = document.createElement('div');
                globalRating.classList.add('col-6');
                globalRating.classList.add('col-lg-2');
                globalRating.classList.add('col-xl-2');
                globalRating.classList.add('ratings');

                var ratings = document.createElement('h5');
                ratings.innerHTML = Math.trunc(movie.vote_average * 10) / 10;
                globalRating.appendChild(ratings);

                var img = document.createElement('img');
                img.setAttribute('src', 'img/star.png');
                img.setAttribute('id', 'star');
                globalRating.appendChild(img);
                movieDivRatings.appendChild(globalRating);
                rowreview.appendChild(globalRating);

                //puntuacion de Criticats
                var cRating = document.createElement('div');
                cRating.classList.add('col-6');
                cRating.classList.add('col-lg-2');
                cRating.classList.add('col-xl-2');
                cRating.classList.add('ratings');

                var ratings = document.createElement('h5');
                ratings.innerHTML = avg;
                cRating.appendChild(ratings);

                var img = document.createElement('img');
                img.setAttribute('src', 'img/Criticatslogo.png');
                img.setAttribute('id', 'ratinglogo');
                cRating.appendChild(img);

                movieDivRatings.appendChild(cRating);
                rowreview.appendChild(cRating);

                //relleno
                var relleno = document.createElement('div');
                relleno.classList.add('col-1');
                relleno.classList.add('col-md-1');
                relleno.classList.add('col-lg-3');
                relleno.classList.add('col-xl-4');
                movieDivRatings.appendChild(relleno);
                rowreview.appendChild(relleno);

                //botones
                var buttonsDiv = document.createElement('div');
                buttonsDiv.classList.add('col-12');
                buttonsDiv.classList.add('col-lg-5');
                buttonsDiv.classList.add('col-xl-4');
                buttonsDiv.classList.add('movieButtons');
                buttonsDiv.setAttribute('id', 'buttonsDiv')

                getLists(index, movie.name, movie.id, 1);

                var reviewButton = document.createElement('button');
                reviewButton.classList.add('btn');
                reviewButton.classList.add('shadow');
                reviewButton.classList.add('btn-primary');
                reviewButton.setAttribute('id', 'reviewButton');
                reviewButton.setAttribute('data-bs-toggle', 'modal');
                reviewButton.setAttribute('data-bs-target', `#reviewModal${index}`);
                reviewButton.setAttribute('content_id', movie.id);
                var reviewButtonImg = document.createElement('img');
                reviewButtonImg.setAttribute('src', '../img/customer-review.png');
                reviewButton.appendChild(reviewButtonImg);
                buttonsDiv.appendChild(reviewButton);

                buttonsDiv.innerHTML += `<div class="modal fade" id="reviewModal${index}" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="reviewModalLabel${index}">Dejar una Reseña - ${movie.name}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form id="reviewForm${index}" class="text-center" method="POST">
                                                <div class="form-group mb-3">
                                                    <label for="reviewtitle${index}">Título</label>
                                                    <input type="text" class="form-control" id="reviewTitle${index}" name="reviewTitle" placeholder="Titulo de su reseña..." required>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <input hidden type="text" class="form-control" id="content_id${index}" name="content_id" value="${movie.id}" readonly>
                                                    <input hidden type="text" class="form-control" id="tipo${index}" name="content_id" value="1" readonly>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="reviewText">Reseña</label>
                                                    <textarea class="form-control" id="reviewText${index}" rows="3" placeholder="Escribe tu reseña aquí" name="reviewText" required></textarea>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label>Calificación</label>
                                                    <div>
                                                        ${[...Array(10).keys()].map(i => `
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="rating${index}" id="rating${i + 1}" value="${i + 1}" required>
                                                                <label class="form-check-label" for="rating${i + 1}">${i + 1}</label>
                                                            </div>`).join('')}
                                                    </div>
                                                </div>
                                                <button class="btn btn-primary" id="sendbtn">Enviar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                var listButton = document.createElement('button');
                listButton.classList.add('btn');
                listButton.classList.add('shadow');
                listButton.classList.add('btn-primary');
                listButton.setAttribute('id', 'listButton');
                listButton.setAttribute('data-bs-toggle', 'modal');
                listButton.setAttribute('data-bs-target', `#exampleModal${index}`);
                var listButtonImg = document.createElement('img');
                listButtonImg.setAttribute('src', '../img/lista-de-deseos.png');
                listButton.appendChild(listButtonImg);
                buttonsDiv.appendChild(listButton);

                movieDivRatings.appendChild(buttonsDiv);
                rowreview.appendChild(buttonsDiv);

                //aqui anida toda la informacion al div principal
                movieDivBody.appendChild(movieDivTitle);
                movieDivBody.appendChild(movieDivRatings);

                movieDivRatings.appendChild(rowreview);

                movieDivPoster.appendChild(posterLink);

                movieDiv.appendChild(movieDivPoster);
                movieDiv.appendChild(movieDivBody);

                movieDetailsDiv.appendChild(movieDiv);

                document.getElementById('reviewForm' + index).addEventListener('submit', function (event) {
                    event.preventDefault();
                    saveReview({ index: index })
                });

                $("#toggleButton" + index).click(function () {
                    $("#responsiveContent" + index).toggleClass("d-none");
                });
            });
        }
    });

}

//theMovieDb.movies.getById({ "id": 76203 }, exitoRecogiendoPeli, errorRecogiendoPeli);

function crearSerie() {

    let numPagina = Math.floor((Math.random() * 100) + 1);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjYwYjNlODk1NGIxNzBhZWQzMjhjYTQyODhiZDM0MSIsInN1YiI6IjY2MTY0NzIxZGMxY2I0MDE3YzFiZmI2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Npwwt-7PuAx0nLn4Xvayl3zbMUnc0IZJB-nYBqgkSvY'
        }
    };

    fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es&page=' + numPagina + '&sort_by=popularity.desc', options)
        .then(response => response.json())
        .then(response => {
            exitoRecogiendoSerie(response); // Call exitoRecogiendoSerie with the retrieved tv data
        })
        .catch(err => {
            console.error(err); // Log error to the console
            errorRecogiendoSerie(err); // Call errorRecogiendoSerie when there is an error
        });
}


window.addEventListener('scroll', function () {
    // Obtener la altura total de la página
    const documentHeight = document.documentElement.scrollHeight;
    // Obtener la posición actual del desplazamiento vertical
    const scrollPosition = window.scrollY;
    // Definir un umbral (por ejemplo, 100 píxeles) para determinar si el usuario está cerca del final
    const threshold = 100;

    // Si el usuario está cerca del final de la página, crear nueva serie
    if (scrollPosition + window.innerHeight >= documentHeight - threshold) {

        crearSerie();
    }
});


window.onload = function () {

    crearSerie();

};
