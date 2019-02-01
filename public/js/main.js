$(document).ready(function() {

    // SIDENAV FEATURES
    $("select").formSelect();
    $(".sidenav").sidenav();
    $("input#input_text, textarea#textarea2").characterCounter();

    const checkLocationInput = function() {
        let locationFilter = $("#side-nav-location").val();
        if (locationFilter.length > 0) {
            $(location).attr('href',"/posts/" + locationFilter);
        } else {
            console.log("no location entered")
        }
    }

    $("#side-search").on("click", function() {
        checkLocationInput();
    })

    $(document).on("keyup", function(event) {
        if (event.keyCode === 13) {
            checkLocationInput();
        }
    })
});
