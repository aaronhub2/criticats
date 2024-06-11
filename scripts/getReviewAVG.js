function getReviewAVG(contentId) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "../scriptsphp/getReviewAVG.php",
            type: "POST",
            data: { content_id: contentId },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}
