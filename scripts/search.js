$(document).ready(function () {
    document.getElementById("searchbtn").addEventListener('click', (e) => {
        e.preventDefault();

        var search = document.getElementById('search').value;
        var select = document.getElementById('select').value;


        //Envia los values en la URL
        if (select === "Peliculas" || select === "Series" || select === "Todo") {
            const queryString = `search=${encodeURIComponent(search)}&type=${select}`;
            window.location.href = `searchResults.php?${queryString}`;
        } else {
            //window.location.href = "index.php"; // Si no es valido
        }

    });
});