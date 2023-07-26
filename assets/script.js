var quoteOne = "https://api.quotable.io/random";
var quoteOneBox = document.getElementById("quote-one");

function generateQuote() {
    document.getElementById("quote-one").innerHTML = "";
    document.getElementById("quote-two").innerHTML = "";

    fetch(quoteOne)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var quoteOneLine = document.createElement("h2");
        quoteOneLine.textContent = data.content;
        var quoteOneAuthor = document.createElement("p");
        quoteOneAuthor.textContent = data.author;
        quoteOneBox.append(quoteOneLine, quoteOneAuthor);
    })

    var quoteTwo = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";
    var quoteTwoBox = document.getElementById("quote-two");

    fetch(quoteTwo)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var randomNumber = Math.floor(Math.random() * data.length);
        var randomDesignQuote = data[randomNumber];

        var quoteTwoLine = document.createElement("h2");
        var quoteTwoAuthor = document.createElement("p");
        quoteTwoLine.textContent = randomDesignQuote.content.rendered;
        quoteTwoAuthor.textContent = randomDesignQuote.title.rendered;
        quoteTwoBox.append(quoteTwoLine, quoteTwoAuthor);
    })
}