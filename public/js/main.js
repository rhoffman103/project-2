$(document).ready(() => {
  // SIDENAV FEATURES
  $("select").formSelect();
  $(".sidenav").sidenav();
  $("input#input_text, textarea#textarea2").characterCounter();

  // Post Inputs
  var postBody = $("#texterea2");
  var zip = $("#zip");
  var topics = $("#topic")
    .parent()
    .children("input")
    .val();
  var rating = $("#rating")
    .parent()
    .children("input")
    .val();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!postBody.val().trim() || !zip.val().trim()) {
      return;
    }

    var userName = $("#user-name").text();
    var userID = "";

    $.get("/api/usersearch/" + userName, data => {
      userID = data[0].ID;
    });
    console.log(userID)
    // Constructing a newPost object to hand to the database
    var newPost = {
      Location: titleInput.val().trim(),
      Body: bodyInput.val().trim(),
      Public: true,
      AuthorID: userID,
      Topics: topics,
      Rating: rating
    };
    submitPost(newPost);
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/testadd", post, function() {
      // window.location.href = "/blog";
      console.log("post \n" + post)
    });
  }
});

$(document).on("click", "#submit-post", function(event) {
  handleFormSubmit(event)
});
