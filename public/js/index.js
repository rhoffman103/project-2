$(document).ready(() => {

  $("#search-submit").on("click", function() {
    const filters = {
      Location: $("#location").val().trim(),
      Topics: $("#topic").parent().children("input").val(),
      Rating: $("#rating").parent().children("input").val()
    };

    $.get(`/api/post/get/?l=${filters.Location}&t=${filters.Topics}&r=${filters.Rating}`);
    
  });

  $("#search-submit-slideout").on("click", function() {
    const filters = {
      Location: $("#location-slideout").val().trim(),
      Topics: $("#topic-slideout").parent().children("input").val(),
      Rating: $("#rating-slideout").parent().children("input").val()
    };

    $.get(`/api/post/get/?l=${filters.Location}&t=${filters.Topics}&r=${filters.Rating}`);
    
  });


  $("#post-submit").on("click", function() {
    
    $.post("/api/post/add", {

    });
  });
});