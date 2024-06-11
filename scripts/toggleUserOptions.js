$(document).ready(function () {

    let userID = $('#hiddenButton').attr('user_id');

    $('#myReviews').click(function () {

        $('#myLists').attr('class', 'nav-link');
        $('#myLists').attr('aria-current', '');

        $('#myReviews').attr('class', 'nav-link active shadow');
        $('#myReviews').attr('aria-current', 'page');

        $('.userBody').html(``);
        getReviewsUser(userID);
    })

    $('#myLists').click(function () {

        $('#myReviews').attr('class', 'nav-link');
        $('#myReviews').attr('aria-current', '');

        $('#myLists').attr('class', 'nav-link active shadow');
        $('#myLists').attr('aria-current', 'page');

        $('.userBody').html(`<div class="col-12 col-md-6">
        <table class="table table-bordered listsTable">
            <thead>
                <tr>
                    <th>
                        <h3>Películas</h3>
                    </th>
                </tr>
            </thead>
            <tbody id="movieListTableBody">

            </tbody>
            <tfoot>
                <tr>
                    <td><button class='btn btn-primary' onclick="addNewList(0, ${userID}, this)">Nueva lista</button></td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="col-12 col-md-6">
        <table class="table table-bordered listsTable">
            <thead>
                <tr>
                    <th>
                        <h3>Series</h3>
                    </th>
                </tr>
            </thead>
            <tbody id="seriesListTableBody">

            </tbody>
            <tfoot>
                <tr>
                    <td><button class='btn btn-primary' onclick="addNewList(1, <?php echo $_SESSION['user_id']; ?>,this)">Nueva lista</button></td>
                </tr>
            </tfoot>
        </table>
    </div>`);

    getListsUser();
    })

})

