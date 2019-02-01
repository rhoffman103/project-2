$(document).ready(() => {

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
    }

    const userPosts = name => {
        $.get("/user/" + name, data => {
        })
    }

    const goToUsersPosts = name => {
        $.get(`/user/${name}`);    }

    // Render a users posts
    const renderUserPosts = name => {
        // $.get("/api/authors/" + name, data => {
        $.get("/api/postsby/" + name, data => {
            console.log("username: " + data.userName);

            $(".local-posts").hide();
            $(".add-post").hide();
            $(".all-posts").hide();
            $(".user-posts").empty();

            var userView = $("<h5>")
            $(userView).html(`${data.userName}'s Posts`)
                .appendTo(".user-posts");

            data.posts.forEach(post => {
                let tags = "";

                post.Tags.forEach((Tag, i) => {
                    if (i < post.Tags.length) {
                        tags += `${Tag.tag}, `;
                    } else {
                        tags += Tag.tag;
                    }
                });

                var userPosts = $(`
                <div class="post">
                    <div class="text-bubble">
                        <div class="bubble z-depth-1">
                            <p class="body-text">${post.Body}</p>
                        </div>
                        <div class="triangle-right"></div>
                        <div class="icon">
                            <div class="icon-picture" style="background-image: url(fashion-festival-graffiti-1447356.jpg);"></div>
                            <span class="icon-name">${data.userName}</span>
                        </div>
                        <div class="post-info">
                            <p>Postal: ${post.Location}</p>
                            <span id="tags">Topics: ${tags}</span>
                            <span id="time-stamp">${post.createdAt}</span>
                        </div>
                    </div>
                </div>`)
                $(userPosts).appendTo($(".user-posts"));
            })
            
        })
    }

    const logUserPosts= (name) => {
        $.get("/api/postsby/" + name, data => {
            console.log(data);
        })
    }

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
    })

    // click to retrieve users posts
    // $('body').on( "click", ".username", (e) => {
        // e.preventDefault();
        // renderUserPosts($(e.currentTarget).text());
        // $('.userNameList').empty();
        // logUserPosts($(e.currentTarget).text());
    //   });
});