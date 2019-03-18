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
    const performSearch = (mobile) => {
        const $location = $(`.side-nav-location${mobile}`).val().trim();
        const $tag = $(`.topic-filter${mobile} :selected`).text();
        const $select = $(`.topic-filter${mobile}`).children("option:selected").attr("value");
        const $rating = $(`rating-filter${mobile} :selected`).text();
        let URL = "";
        console.log(mobile);
        if ((/^\d{5}$|^\d{5}-\d{4}$/.test($location)) || ($select > 0)) {
            URL += "/posts";
            if (/^\d{5}$|^\d{5}-\d{4}$/.test($location)) {
                URL += `/location/${$location}`;
            };
            if ($select > 0) {
                URL += `/tag/${$tag.toLowerCase()}`;
            };
            // currently not a running feature
            // if ($rating != "Choose Rating") {
            //     URL += `/rating/${$rating.replace(/\s/g, '-').toLowerCase()}`;
            // }

            $(location).attr('href', URL);
            // console.log(URL);
        };

    };

    // Retrieve list of users from search box
    const renderSearch = (key, mobile) => {
        if ($(".search-text").val() != "" || $(`.search-text-${mobile}`).val() != "") {
            
            $.get("/api/usersearch/" + key, data => {
                if (mobile) {
                    $(`.userNameList-${mobile}`).html('')
                }
                else {
                    $('.userNameList').html('')
                }

                data.forEach((element, index) => {
                    var li = $('<li>');
                    if (mobile) {
                        $(li).addClass('username li-' + index)
                        .appendTo($(`.userNameList-${mobile}`));
                    }
                    else {
                        $(li).addClass('username li-' + index)
                        .appendTo($('.userNameList'));
                    }

                    var a = $("<a>").attr("href", `/user/${element.UserName}`)
                        .html(element.UserName);
                    $(a).appendTo($(`.li-${index}`))  ;                  
                })
            })
        }
        else if($(".search-text").val() === "") {
            if (mobile) {
                $(`.userNameList-${mobile}`).empty();
            }
            else {
                $('.userNameList').empty();
            }
        }
    };

    // EVENTS
    // render realtime username search
    $('.search-text').on("keyup", e => {
        renderSearch(e.target.value);
    })

    $('.search-text-mobile').on("keyup", e => {
        renderSearch(e.target.value, "mobile");
    })

    // clear dropdown when clicked away
    $('html').on('click', e => {
        var element = e.target.className

        if (!element.includes("username")) {
            $('.userNameList').empty();
        }
    });

    // SEARCH FILTERS
    $(".filter-search").on("click", (e) => {
        e.preventDefault();
        performSearch("");
        // checkLocationInput();
    });

    $(".filter-search-mobile").on("click", (e) => {
        e.preventDefault();
        performSearch("-mobile");
    });

    $(document).on("keyup", function(event) {
        if (event.keyCode === 13) {
            checkLocationInput();
        }
    });
});