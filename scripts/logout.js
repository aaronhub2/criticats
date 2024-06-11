$(document).ready(function () {
    $('#logoutbutton').on('click', function(){
        
        $.ajax({
            type: 'POST',
            url: 'scriptsphp/logout.php',
            
            success: function (response) {
                console.log(response);
                setTimeout(function () {
                    window.location.href = 'index.php';
                }, 1000);
            },
            error: function (xhr, status, error) {
                // Handle error cases if needed
                setTimeout(function () {
                    window.location.href = 'index.php';
                }, 2000);
            }
        });

    });
});
