const escape =  function(str) { //Security purposes so that all text will return a string
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (i) => {
  const tweet = 
  `<article>
  <div class="tweet-header">
    <span>
      <img src="${i.user.avatars}" alt="This is a profile image"><h4>${escape(i.user.name)}</h4>
    </span>
    <h4 class="tag">${escape(i.user.handle)}</h4>
  </div>
  <div><p>${escape(i.content.text)}</p></div>
  <div class="footer">
    <h6>${moment(i.created_at, '').fromNow()}</h6>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </div>
</article>`

  return tweet;
}


const renderTweets = tweets => { //Adds new tweet element to the existing tweets object
  for (let i of tweets) {
    $("#tweet-container").prepend(createTweetElement(i));
  }
}


$(".err").hide(); //Hides the error messages when page loads
$(".new-tweet").hide(); //Hides the tweet input form when page loads

$(document).ready(() => {
  function loadTweets() {
    $.ajax("/tweets/", { method: "GET" })
    .then((data) => {
      renderTweets(data);
    })
  }
  loadTweets(); //loads available tweets from the ajax request above from /tweets/
  $("form").on("submit", (event) => {
    event.preventDefault();
    if ($("form").serialize() === "text=") { //Error handling when user input is empty
      $("#err2").hide();
      $("#err1").slideDown(200);
      setTimeout(() => {
        $("#err1").slideUp(500);
      }, 3000);

    } else if ($("form").serialize().length - 5 > 140) { //Error handling when user input exceeds 
                                                         //limit
      $("#err1").hide();
      $("#err2").slideDown(200);
      setTimeout(() => {
        $("#err2").slideUp(500);
      }, 3000);

    } else {
      $.ajax({ 
          url: "/tweets/",
          method: "POST",
          data: $("form").serialize()
      })
      .done(() => {
          $("#tweet-container").empty(); //Clears all of the tweets shown on the screen
          loadTweets(); //Reload all tweets after new tweet has been sent to the tweets object
          $("textarea").val("").focus(); //Puts cursor in the textrea of the form after loading all 
                                         //tweets
          $(".err").hide();
      });
      $(".new-tweet form output.counter").text(140);
    }
  })
  $("nav div").on("click", () => { //Shows or hides the form to submit a tweet when clicked
    if ($("form").is(":visible")) {
      $(".new-tweet").slideUp(200);
    }
    else {
      $(".new-tweet").slideDown(200);
      $("textarea").val("").focus();
    }
  });
});