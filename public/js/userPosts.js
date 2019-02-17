$(document).ready(function() {

  // A function for handling what happens when the form to create a new post is submitted
  const handleFormSubmit = function() {
    // Post Inputs
    var postBody = $("#textarea2").val();
    var zip = $("#zip").val();
    var tagsArray = [];

    $("#topics :selected").each(function(i, element) {
      if (i > 0) {
        tagsArray.push($(element).text());
      }
    });

    const tags = tagsArray.join();

    $.get("/api/user").then(data => {
      console.log(`User Data:`, data);
      console.log(data.username);
      // Constructing a newPost object to hand to the database
      const newPost = {
          Location: zip,
          Body: postBody,
          Public: true,
          AuthorID: data.id,
          UserName: data.username,
          Tags: tags
        };
      submitPost(newPost);
      location.reload();
    });
  };

  // Submits a new post
  const submitPost = post => {
    $.post("/api/addpost", post, function() {
      console.log("post \n" + post);
    });
  };

  $("#submit-post").on("click", function() {
    handleFormSubmit();
  });
});
