/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const $tweetSection = $("<section>").addClass("all-tweets");
  
    const $tweet = $("<article>").addClass("tweet");
  
    const $header = $("<header>");
    const $div = $("<div>").appendTo($header);
    $("<img>")
      .attr("src", tweet.user.avatars)
      .attr("alt", "User Avatar")
      .appendTo($div);
    $("<h3>").text(tweet.user.name).appendTo($div);
    $("<output>").text(tweet.user.handle).appendTo($header);
    $header.appendTo($tweet);
  
    $("<p>").text(tweet.content.text).appendTo($tweet);
  
    const $footer = $("<footer>");
    $("<output>")
      .addClass("timeago")
      .attr("datetime", tweet.created_at)
      .appendTo($footer);
    const $divIcons = $("<div>").appendTo($footer);
    $("<i>")
      .addClass("fas fa-flag")
      .appendTo($divIcons);
    $("<i>")
      .addClass("fas fa-retweet")
      .appendTo($divIcons);
    $("<i>")
      .addClass("fas fa-heart")
      .appendTo($divIcons);
    $footer.appendTo($tweet);
  
    $tweet.appendTo($tweetSection);
  
    return $tweetSection;
  };  

  const renderTweet = function(tweet) {
    const $tweetContainer = createTweetElement(tweet);
    $("#tweets-container").prepend($tweetContainer);
    // Update time ago formatting
    timeago.render($tweetContainer.find(".timeago"));
  };

  const renderTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container");

    $tweetsContainer.empty();

    tweets.forEach((tweet) => {
      const $tweetContainer = createTweetElement(tweet);
      $tweetsContainer.after($tweetContainer);
    });

    // Update the time ago formatting for all tweets
    timeago.render(document.querySelectorAll(".tweet .timeago"));
  };
  
  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "json",
    })
      .then(function(tweets) {
        renderTweets(tweets);
      })
      .catch(function(error) {
        console.error("Error loading tweets:", error);
      });
  };
  
  // Call loadTweets on page load to fetch and render the tweets
  loadTweets();
  

  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    
    const tweetContent = $("#tweet-text").val();
    const counterElement = $(".counter");
    
    if (!tweetContent) {
      alert("Please enter a tweet!");
      return;
    }
    
    if (tweetContent.length > 140) {
      alert("Tweet exceeds the character limit!");
      return;
    }
    
    const formData = $(this).serialize();
    
    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: formData,
    })
      .then(function(response) {
        console.log("Tweet submitted successfully!");
        // Clear the tweet input field
        $("#tweet-text").val("");
        // Reset the counter
        counterElement.text("140");
        // Render the new tweet
        loadTweets();
      })
      .catch(function(error) {
        console.error("Error submitting tweet:", error);
      });

      // Reset the form after submission
      $(this).trigger("reset");
      $(".counter").text("140");
    });

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