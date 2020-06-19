$(document).ready(function() { //Counts the amount of characters that the user has inputted and 
                               //changes the number shown based on the number of characters

  const textArea = $(".new-tweet form textarea.tweet-text"); //User input
  const counter = $(".new-tweet form output.counter"); //Number counter shown on page

  textArea.on("keyup", (function() {
    const $this = $(this);
    if ((140 - ($this.val().length) >= 0)) {
      counter.css("color", "black");
      counter.text(140 - ($this.val().length));
    } else {
      counter.css("color", "red");
      counter.text(140 - ($this.val().length));
    }
  }));
});

