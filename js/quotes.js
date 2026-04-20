(function () {
  let quotesRequest = null;

  function getQuotesUrl() {
    const scriptUrl = document.currentScript ? document.currentScript.src : "";
    return new URL("../data/quotes.json", scriptUrl || window.location.href).toString();
  }

  function fetchQuotes() {
    if (!quotesRequest) {
      quotesRequest = fetch(getQuotesUrl()).then(function (response) {
        if (!response.ok) {
          throw new Error("Could not load quotes.");
        }

        return response.json();
      });
    }

    return quotesRequest;
  }

  function pickRandomQuote(quotes) {
    if (!Array.isArray(quotes) || !quotes.length) {
      return null;
    }

    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  window.loadRandomQuoteInto = function (textElement, authorElement) {
    if (!textElement || !authorElement) {
      return;
    }

    fetchQuotes()
      .then(function (quotes) {
        const randomQuote = pickRandomQuote(quotes);

        if (!randomQuote) {
          return;
        }

        textElement.textContent = randomQuote.text;
        authorElement.textContent = randomQuote.author;
      })
      .catch(function () {
        // Keep the static fallback quote already rendered in the page.
      });
  };

  window.loadRandomQuoteInto(
    document.getElementById("quoteText"),
    document.getElementById("quoteAuthor")
  );
}());
