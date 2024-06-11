function getLists(index, movieTitle, movieID, tipo) {
    $.ajax({
        type: 'GET',
        url: 'scriptsphp/getLists.php',
        success: function (response) {

            let lists = JSON.parse(response);

            let listsHTML = lists.map(list => list.Tipo == tipo ? `
                <tr>
                    <td class='list text-start'><b>${list.title}</b></td>
                    <td class='listSymbol add${index} text-end' list_ID='${list.ID}'><img src='img/agregar.png' alt="añadir"></td>
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


function getListsUser() {
    if (typeof (mostrarListas) === 'function') {

        $.ajax({
            type: 'GET',
            url: 'scriptsphp/getLists.php',
            success: function (response) {

                let lists = JSON.parse(response);
                mostrarListas(lists)

            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        })
    }
}




