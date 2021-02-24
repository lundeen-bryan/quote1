const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideSpinner() {
  if (!showSpinner.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

const url = 'https://api.quotable.io/random'; //using this API there is no need to find a proxyURL

async function getQuote() {
  showSpinner();
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      if (data.author === '') {
        authorText.innerText = 'Unknown';
      } else {
        authorText.innerText = data.author;
      }
      if (data.content > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.content;
      hideSpinner();
    })
    .catch(function (err) {
      getQuote();
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
