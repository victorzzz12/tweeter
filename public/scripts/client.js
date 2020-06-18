const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (i) => {
  const tweet = 
  `<article>
  <div class="header">
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


const renderTweets = tweets => {
  for (let i of tweets) {
    $("#tweet-container").prepend(createTweetElement(i));
  }
}

$(document).ready(() => {
  $(".err").hide();
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
      $("#err2").hide();
      $("#err1").slideDown(200);

    } else if ($("form").serialize().length - 5 > 140) {
      $("#err1").hide();
      $("#err2").slideDown(200);

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
          $(".err").hide();
      });
    }
  })
})