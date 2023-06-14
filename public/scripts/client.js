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
      .text(`Posted on ${formatDate(tweet.created_at)}`)
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

  const renderTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container");

    tweets.forEach((tweet) => {
      const $tweetContainer = createTweetElement(tweet);
      $tweetsContainer.after($tweetContainer);
    });
  };

  // Helper function to format the date
  const formatDate = function(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Example data
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  // Render the tweets
  renderTweets(data);

  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    
    const formData = $(this).serialize();
    
    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: formData,
    })
    .then(function(response) {
      // Handle the response if needed
      console.log("Tweet submitted successfully!");
    })
    .catch(function(error) {
      // Handle the error if needed
      console.error("Error submitting tweet:", error);
    });
  });
});