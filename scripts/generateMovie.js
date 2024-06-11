let body = document.getElementById("movie");

function generateMovie(movieInfo, tipo) {
    getReviewAVG(movieInfo.id)
        .then(function (data) {
            data = Math.trunc(data);
            avg = data ? data : 0;

            // Crear el contenido HTML básico de la película
            body.innerHTML = `<section class="row">
    <div class="col-1"></div>
    <div class="col-10 movie-main shadow text-center">
        <div class="row">
            <div class="col-12 col-lg-4 col-xl-3 text-center posterCol">
                <img src="https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}" alt="${movieInfo.title ? movieInfo.title : movieInfo.name} class="shadow">
            </div>
            <div class="col-12 col-lg-8 col-xl-7 movieInfo d-flex flex-column">
                <div>
                    <div class="row">
                        <div class="col-12">
                            <h2>${movieInfo.title ? movieInfo.title : movieInfo.name} (${movieInfo.release_date ? movieInfo.release_date.substring(0, 4) : movieInfo.first_air_date.substring(0, 4)})</h2>
                        </div>
                    </div>
                    <div class="row card">
                        <div class="card-body col-12">${movieInfo.overview ? movieInfo.overview : (movieInfo.title ? "Esta película no tiene descripción." : "Esta serie no tiene descripción.")}</div>
                    </div>
                </div>
                <div class="mt-auto">
                    <div class="row movieInfoButtons text-center">
                        <div class="col-12 col-lg-6 movieInfoRatings text-center text-lg-start">
                            <img src="img/star.png" alt="star">
                            <span><b>${Math.trunc(movieInfo.vote_average * 10) / 10}</b></span>
                            <img src="img/Criticatslogo.png" alt="Criticats Logo">
                            <span><b>${avg}</b></span>
                        </div>
                        <div class="col-12 col-lg-6 text-center text-lg-end buttons" id="buttonsDiv">
                            <button class="btn shadow btn-primary" id="reviewButton" data-bs-toggle="modal" data-bs-target="#reviewModal">
                                <img src="../img/customer-review.png" alt="Dejar Reseña">
                            </button>
                            <button class="btn shadow btn-primary" id="listButton" data-bs-toggle="modal" data-bs-target="#exampleModal0">
                                <img src="../img/lista-de-deseos.png" alt="Añadir a Lista">
                            </button>
        <!--INICIO DE MODAL DE RESEÑAS-->
                            <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="reviewModalLabel">Dejar una Reseña - ${movieInfo.title ? movieInfo.title : movieInfo.name}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form id="reviewForm" class="text-center" method="POST">
                                                <div class="form-group mb-3">
                                                    <label for="reviewtitle">Título</label>
                                                    <input maxlength="50" type="text" class="form-control" id="reviewTitle" name="reviewTitle" placeholder="Titulo de su reseña..." required>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <input hidden type="text" class="form-control" id="content_id" name="content_id" value="${movieInfo.id}" readonly>
                                                    <input hidden type="text" class="form-control" id="tipo" name="content_id" value="${tipo}" readonly>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="reviewText">Reseña</label>
                                                    <textarea class="form-control" id="reviewText" rows="3" placeholder="Escribe tu reseña aquí" name="reviewText" required></textarea>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label>Calificación</label>
                                                    <div>
                                                        ${[...Array(10).keys()].map(i => `
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="rating" id="rating${i + 1}" value="${i + 1}" required>
                                                                <label class="form-check-label" for="rating${i + 1}">${i + 1}</label>
                                                            </div>`).join('')}
                                                    </div>
                                                </div>
                                                <button class="btn btn-primary" id="sendbtn">Enviar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--FIN DE MODAL DE RESEÑAS-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-1"></div>
</section>`;

            // Llamada AJAX para obtener las listas y generar el modal de listas
            getLists(0, movieInfo.title ? movieInfo.title : movieInfo.name, movieInfo.id, movieInfo.title ? 0 : 1);

            document.getElementById('reviewForm').addEventListener('submit', function (event) {
                event.preventDefault();
                saveReview()
            });

            getReviewsMovie(movieInfo.id, tipo);
        })
        .catch(function (error) {
            // Handle error
            console.error("Error fetching average review:", error);
        });

}

function getLists(index, movieTitle, movieID, tipo) {
    $.ajax({
        type: 'GET',
        url: 'scriptsphp/getLists.php',
        success: function (response) {
            let lists = JSON.parse(response);
            let listsHTML = lists.map(list => list.Tipo == tipo ? `
                <tr>
                    <td class='list text-start'><b>${list.title}</b></td>
                    <td class='listSymbol add${index} text-end' list_ID='${list.ID}'><img src='img/agregar.png' alt="Añadir"></td>
                </tr>` : '').join('');
            let modalHTML = `
                <div class="modal fade" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel${index}" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel${index}">Añadir a una lista - ${movieTitle}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <table id='movieList'>
                                    ${listsHTML}
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class='float-end btn btn-secondary' data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            if (listsHTML.trim() === '') {
                modalHTML = `
                <div class="modal fade" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel${index}" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel${index}">Añadir a una lista - ${movieTitle}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <table>
                                    <tr>
                                        <td class='list text-start'>Aún no hay listas.</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class='float-end btn btn-secondary' data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
            $('#buttonsDiv').append(modalHTML);
            $('.add' + index).click(function () {
                addItemToList(this, movieID);
            });
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}
