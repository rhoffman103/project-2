$(document).ready(() => {

    geolocator.config({
        language: "en",
        google: {
            version: "3",
            key: "AIzaSyD5oLXzPS0A9N-z3VYZc0rnGu5yVuyK9Xg"
        }
    });

    const getLocalPosts = postal => {
        $.get("blueit/posts/" + postal, data => {
            // renders local posts page
        })
    }

    // Render a users posts
    const renderLocalPosts = postal => {
        // $.get("api/posts/" + postal, data => {
        $.get("api/posts/03825", data => {
            // console.log(data);

            $(".local-posts").empty();
            $(".user-posts").empty();

            var userView = $("<h5>")
            $(userView).html(`Posts in ${postal}`)
                .appendTo(".local-posts");

            if (data.length > 0) {
                data.forEach(element => {
                    console.log(element);
                    var userPosts = $(`
                    <div class="post">
                        <div class="text-bubble">
                            <div class="bubble z-depth-1">
                                <p class="body-text">${element.Body}</p>
                            </div>
                            <div class="triangle-right"></div>
                            <div class="icon">
                                <div class="icon-picture" style="background-image: url(fashion-festival-graffiti-1447356.jpg);"></div>
                                <span class="icon-name">${data.UserName}</span>
                            </div>
                            <div class="post-info">
                                <p>Postal: ${element.Location}</p>
                                <span id="tags">Topics: ${element.Tags}</span>
                                <span id="time-stamp">${element.createdAt}</span>
                            </div>
                        </div>
                    </div>`)
                    $(userPosts).appendTo($(".local-posts"));
                })
            }
            else {
                var userPosts = $(`
                <p>No posts in this area yet</p>`);
                $(userPosts).appendTo($(".local-posts"));
            }
            
        })
    }

    window.onload = function () {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumWait: 10000,     // max wait time for desired accuracy
            maximumAge: 0,          // disable cache
            desiredAccuracy: 30,    // meters
            fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
            addressLookup: true,   // requires Google API key if true
            timezone: false,        // requires Google API key if true
        };
        geolocator.locate(options, function (err, location) {
            if (err) return console.log(err);
            console.log(err || location);
            if (location) {
                sessionStorage.setItem('location', location.address.postalCode);
                // renderLocalPosts(location.address.postalCode)
            }
            else {
                console.log("user denied access to location");
            }
            
        });
    };

    $(document).on("click", "#side-nav-location", () => {
        renderLocalPosts(location.address.postalCode)
    })
})