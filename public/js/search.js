$(document).ready(() => {

    // Retrieve list of users from search box
    const renderSearch = (key) => {
        if ($(".search-text").val() != "") {
            console.log("axaj request");
            $.get("/api/usersearch/" + key, data => {

                $('.userNameList').html('')

                console.log(data[0]);

                data.forEach((element, index) => {
                    // console.log(element.name);
                    var li = $('<li>');
                    $(li).addClass('username li-' + index)
                        .appendTo($('.userNameList'));

                    var a = $("<a>").attr("href", "/blueit/" + element.UserName)
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
        $.get("/blueit/" + name, data => {
        })
    }

    // Render a users posts
    const renderUserPosts = name => {
        $.get("/api/authors/" + name, data => {
            console.log(data);

            var userView = $("<h5>")
            $(userView).html(`${data.UserName}'s Posts`)
                .appendTo(".user-posts");

            $(".local-posts").hide();
            $(".add-post").hide();
            $(".user-posts").empty();

            data.Posts.forEach(element => {
                console.log(element)
                console.log("body " + element.Body)
                console.log("name " + data.UserName)
                console.log("time posted " + element.createdAt)
                console.log("tags" + element.Tags)

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
                $(userPosts).appendTo($(".user-posts"));
            })
            
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
    $('body').on( "click", ".username", (e) => {
        // renderUserPosts(e.currentTarget.innerHTML);
        userPosts(e.currentTarget.innerHTML);
        $('.userNameList').empty();
      });
});