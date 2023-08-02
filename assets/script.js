var savedQuoteLine;
var savedQuoteAuthor;
var dogImageURL;

var savedQuoteLineArray = [];
var savedQuoteAuthorArray = [];
var dogImageURLArray = [];

// Function to fetch the inspiring quote and dog image and render them on the HTML 
function generateQuote() {
    console.log(savedQuoteLineArray);
    console.log(savedQuoteAuthorArray);
    console.log(dogImageURLArray);

    document.getElementById("quote-one").innerHTML = "";
    document.getElementById("dog-image").innerHTML = "";

    var quoteOne = "https://api.quotable.io/random";
    var quoteOneBox = document.getElementById("quote-one");

    fetch(quoteOne)// Fetching quote from Quote API
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

    fetch(dogImage)// Fetching dog image from Dog Image API
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

// Take the currently displayed main dog image and main quote with author and places them into "arrays" in LocalStorage
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

    loadQuotes();
}

// Load quotes and dog images from the LocalStorage Array and places them as buttons to the side of the currently loaded dog image and quote.
function loadQuotes() {
    document.querySelector("aside").innerHTML = "";

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

    var savedCombos = document.querySelector("aside");
    for(var i = 0; i < savedQuoteLineArray.length; i++ ) {
        var comboButton = document.createElement("div");
        var comboImage = document.createElement("img");
        var comboQuote = document.createElement("p");

        comboButton.setAttribute("id", "combo-button-" + [i]);
        comboButton.setAttribute("value", i);
        comboImage.setAttribute("src", dogImageURLArray[i]);
        comboQuote.textContent = savedQuoteLineArray[i];
        savedCombos.append(comboButton);
        comboButton.append(comboImage, comboQuote);
        comboButton.setAttribute("onclick", "reloadQuote(this.id)")
    }
}

// Function called by the previous function that when clicked will recall the quote and dog image as shown in the preview image
function reloadQuote(id) {
    document.getElementById("quote-one").innerHTML = "";
    document.getElementById("dog-image").innerHTML = "";

    var x = id;
    var y = parseInt(x.replace("combo-button-",""));

    console.log(y);
    console.log(savedQuoteLineArray[y]);
    console.log(savedQuoteAuthorArray[y]);
    console.log(dogImageURLArray[y]);

    var quoteOneBox = document.getElementById("quote-one");
    var quoteOneLine = document.createElement("h2");
    quoteOneLine.textContent = savedQuoteLineArray[y];

    var quoteOneAuthor = document.createElement("p");
    quoteOneAuthor.textContent = savedQuoteAuthorArray[y];

    quoteOneBox.append(quoteOneLine, quoteOneAuthor);

    var dogImageBox = document.getElementById("dog-image");
    var dogImageElement = document.createElement("img");
    dogImageElement.setAttribute("src", dogImageURLArray[y]);
    dogImageElement.setAttribute("alt", "Random picture of a dog.");
    dogImageBox.append(dogImageElement);
}

loadQuotes(); // Have the saved quotes and dog images saved in LocalStorage appear as the button the moment the web application is opened
generateQuote(); // Have a main quote and dog image appear on the page the moment the web application is opened