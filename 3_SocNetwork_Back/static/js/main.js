let makeMyfriend = function (link){
    
    jQuery.post(link, function() {
        alert( "Success!" );
    }) 
    .fail(function() {
        alert( "Error!!!" );
    });
}