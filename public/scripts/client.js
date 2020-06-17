const createTweetElement = (i) => {
  const tweet = 
  `<article>
  <div class="header">
    <span>
      <img src="${i.user.avatars}" alt="This is a profile image"><h4>${i.user.name}</h4>
    </span>
    <h4 class="tag">${i.user.handle}</h4>
  </div>
  <div><p>${i.content.text}</p></div>
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


const renderTweets = tweets => {
  for (let i of tweets) {
    $("#tweet-container").prepend(createTweetElement(i));
  }
}

$(document).ready(() => {
  function loadTweets() {
    $.ajax("/tweets/", { method: "GET" })
    .then((data) => {
      renderTweets(data);
    })
  }
  loadTweets();
  $("form").on("submit", (event) => {
    event.preventDefault();
    if ($("form").serialize() === "text=") {
      alert("Tweet cannot be empty!");

    } else if ($("form").serialize().length - 5 > 140) {
      alert("Tweet must be within 140 characters!");

    } else {
      $.ajax({
          url: "/tweets/",
          method: "POST",
          data: $("form").serialize()
      })
      .done(() => {
          $("#tweet-container").empty();
          loadTweets();
          $("textarea").val("").focus();
      });
    }
  })
})