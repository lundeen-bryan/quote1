const url = 'https://api.quotable.io/random';

async function getQuote() {
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      document.getElementById('quote').innerHTML = data.content;
      document.querySelector('.quote-author').innerHTML = '- ' + data.author;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// On Load
getQuote();
