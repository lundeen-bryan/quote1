const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const url = 'https://api.quotable.io/random'; //using this API there is no need to find a proxyURL

async function getQuote() {
  //this function is called getQuote it fetches a quote & author from an API
  fetch(url) //fetch the info from the url
    .then(function (data) {
      //put data in this function
      return data.json(); //pull the data as a json file
    })
    .then(function (data) {
      /* get author from api */
      if (data.author === '') {
        authorText.innerText = 'Unknown'; // if there is no author return 'unknown'
      } else {
        authorText.innerText = data.author; //return the author's name
      }
      /* check for char count in quote (<120) & make it smaller font by changing the class */
      if (data.content > 120) {
        quoteText.classList.add('long-quote'); //add the long-quote class
      } else {
        quoteText.classList.remove('long-quote'); //remove the long-quote class
      }
      quoteText.innerText = data.content; //get the quote text from API
    })
    .catch(function (err) {
      getQuote();
      //if error catch the error and run again
    });
}

//Tweet quote
function tweetQuote() {
  const content = quoteText.innerText; //the api uses 'content' for the quote
  const author = authorText.innerText; //put the author in this const
  const twitteUrl = `https://twitter.com/intent/tweet?text="${content}" - ${author}`; //send my quote to twitter add "marks
  window.open(twitteUrl, '_blank'); //make twitter open in a new window
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote); //if new quote btn is clicked gimme a quote
twitterBtn.addEventListener('click', tweetQuote); //if the tweet btn is clicked snd it to twitter

getQuote(); //when the page loads call this function
