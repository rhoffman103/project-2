$(document).ready(() => {

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
    };

    // Perform search on entered filters
    const performSearch = () => {
        const $location = $("#side-nav-location").val();
        const $tag = $("#topic-filter :selected").text();
        const $rating = $("#rating-filter :selected").text();
        let URL = "/posts";
        
        if (/^\d{5}$|^\d{5}-\d{4}$/.test($location)) {
            URL += `/location/${$location}`;
        }
        if ($tag != "Topics") {
            URL += `/tag/${$tag.toLowerCase()}`;
        }
        if ($rating != "Choose Rating") {
            URL += `/rating/${$rating.replace(/\s/g, '-').toLowerCase()}`;
        }

        $(location).attr('href', URL);
    };

    // Retrieve list of users from search box
    const renderSearch = (key) => {
        if ($(".search-text").val() != "") {
            console.log("axaj request");
            $.get("/api/usersearch/" + key, data => {

                $('.userNameList').html('')

                // console.log(data[0]);

                data.forEach((element, index) => {
                    var li = $('<li>');
                    $(li).addClass('username li-' + index)
                        .appendTo($('.userNameList'));

                    var a = $("<a>").attr("href", "/user/" + element.UserName)
                        .html(element.UserName);
                    $(a).appendTo($(".li-" + index))  ;                  
                })
            })
        }
        else if($(".search-text").val() === "") {
            $('.userNameList').empty();
        }
    };

    // EVENTS
    $('.search-text').on("keyup", e => {
        renderSearch(e.target.value);
    })

    // clear dropdown when clicked away
    $('html').on('click', e => {
        var element = e.target.className

        if (!element.includes("username")) {
            $('.userNameList').empty();
        }
    });

    // SEARCH FILTERS
    $("#side-search").on("click", (e) => {
        e.preventDefault();
        performSearch();
        // checkLocationInput();
    });

    $(document).on("keyup", function(event) {
        if (event.keyCode === 13) {
            checkLocationInput();
        }
    });
});