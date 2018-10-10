$(document).ready(function() {
  // SIDENAV FEATURES
  $("select").formSelect();
  $(".sidenav").sidenav();
  $("input#input_text, textarea#textarea2").characterCounter();

  // A function for handling what happens when the form to create a new post is submitted
  const handleFormSubmit = () => {

    var userName = $("#user-name").text();
    var userID;

    // Post Inputs
    var postBody = $("#textarea2").val();
    var zip = $("#zip").val();
    var topics = $("#topics")
      .parent()
      .children("input")
      .val();

    $.get("/api/usersearch/" + userName, data => {
      userID = data[0].ID;
      console.log("user ID " + userID);

      // Constructing a newPost object to hand to the database
      var newPost = {
        Location: zip,
        Body: postBody,
        Public: true,
        AuthorID: userID,
        Topics: topics
      };
      console.log(newPost);
      submitPost(newPost);
    });
  };

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/addpost", post, function() {
      console.log("post \n" + post);
    });
  }

  $("#submit-post").on("click", function() {
    handleFormSubmit();
  });

});
