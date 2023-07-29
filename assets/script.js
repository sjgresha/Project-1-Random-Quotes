var savedQuoteLine;
var savedQuoteAuthor;
var dogImageURL;

var savedQuoteLineArray = [];
var savedQuoteAuthorArray = [];
var dogImageURLArray = [];

function generateQuote() {
    console.log(savedQuoteLineArray);
    console.log(savedQuoteAuthorArray);
    console.log(dogImageURLArray);

    document.getElementById("quote-one").innerHTML = "";
    document.getElementById("dog-image").innerHTML = "";

    var quoteOne = "https://api.quotable.io/random";
    var quoteOneBox = document.getElementById("quote-one");

    fetch(quoteOne)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var quoteOneLine = document.createElement("h2");
        quoteOneLine.textContent = data.content;

        var quoteOneAuthor = document.createElement("p");
        quoteOneAuthor.textContent = data.author;

        quoteOneBox.append(quoteOneLine, quoteOneAuthor);
    })
    
    var dogImage = "https://dog.ceo/api/breeds/image/random";
    var dogImageBox = document.getElementById("dog-image");

    fetch(dogImage)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.message);
        dogImageURL = data.message;

        var dogImageElement = document.createElement("img");
        dogImageElement.setAttribute("src", dogImageURL);
        dogImageElement.setAttribute("alt", "Random picture of a dog.");
        dogImageBox.append(dogImageElement);
    })
}

function saveQuote() {
    if (savedQuoteLineArray.length > 4) {
        savedQuoteLineArray.shift();
      }

    savedQuoteLine = document.querySelector("#quote-one h2").textContent;
    savedQuoteLineArray.push(savedQuoteLine);
    console.log(savedQuoteLineArray);

    localStorage.setItem("savedQuoteLineArray", JSON.stringify(savedQuoteLineArray));

    if (savedQuoteAuthorArray.length > 4) {
        savedQuoteAuthorArray.shift();
      }
    
    savedQuoteAuthor = document.querySelector("#quote-one p").textContent;
    savedQuoteAuthorArray.push(savedQuoteAuthor);
    console.log(savedQuoteAuthorArray);

    localStorage.setItem("savedQuoteAuthorArray", JSON.stringify(savedQuoteAuthorArray));

    if (dogImageURLArray.length > 4) {
        dogImageURLArray.shift();
      }

    dogImageURLArray.push(dogImageURL);
    console.log(dogImageURLArray);

    localStorage.setItem("dogImageURLArray", JSON.stringify(dogImageURLArray));

//    loadQuotes();
}

function loadQuotes() {
    var recalledQuoteLines = JSON.parse(localStorage.getItem("savedQuoteLineArray"));
    var recalledQuoteAuthors = JSON.parse(localStorage.getItem("savedQuoteAuthorArray"));
    var recalledDogImage = JSON.parse(localStorage.getItem("dogImageURLArray"));

    if (recalledQuoteLines === null || recalledQuoteLines === undefined || recalledQuoteLines.length <= 0) {
        savedQuoteLineArray = [];
      } else {
        savedQuoteLineArray = recalledQuoteLines;
      }
    if (recalledQuoteAuthors === null || recalledQuoteAuthors === undefined || recalledQuoteAuthors.length <= 0) {
        savedQuoteAuthorArray = [];
    } else {
        savedQuoteAuthorArray = recalledQuoteAuthors;
    }
    if (recalledDogImage === null || recalledDogImage === undefined || recalledDogImage.length <= 0) {
        dogImageURLArray = [];
    } else {
        dogImageURLArray = recalledDogImage;
    }

    var savedCombos = document.querySelector("aside");// Need to build out to render the button to reload picture and quote.
    for(var i = 0; i < savedQuoteLineArray.length; i++ ) {
        var comboButton = document.createElement("p");
        comboButton.textContent = savedQuoteLineArray[i];
        savedCombos.append(comboButton);
    }
}

loadQuotes();
generateQuote();