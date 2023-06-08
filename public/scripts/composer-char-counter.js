
$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const remainingChars = maxLength - currentLength;
    const counterElement = $(this).siblings(".submit-counter").find(".counter");

    counterElement.text(remainingChars);

    if (remainingChars < 0) {
      counterElement.addClass("invalid");
    } else {
      counterElement.removeClass("invalid");
    }
  });
});
