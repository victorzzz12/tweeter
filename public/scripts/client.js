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
    <h6>${(new Date() - i.created_at)/1000/60/60/24/365}</h6>
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
    console.log(i)
    $("#tweet-container").append(createTweetElement(i));
    
  }
}

$(document).ready(() => {
  console.log("ready!");
  $("form").on("submit", (event) => {
      event.preventDefault();
      console.log("Working");
      $.ajax({
          url: "/tweets/",
          method: "POST",
          data: $("form").serialize()
      })
      .done(() => {
          $("#tweet-container").empty()
          loadTweets();
        });
  })
  function loadTweets() {
    $.ajax("/tweets/", { method: "GET" })
    .then((data) => {
      renderTweets(data);
    })
  }

loadTweets();
})