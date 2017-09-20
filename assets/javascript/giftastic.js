
var animals = ["cat", "dog", "pig", "goat", "fish"]
      // Function for  creating and displaying Button data
function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();
 // console.log('animals : ' + animals)

  // // Looping through the array of movies
 for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("data-animal animalBtn");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", animals[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}


$( document ).ready(function() {
 
  //creating the UI.
  renderButtons();

 
});

 //=======================================
   // Adding click event listen listener to all buttons
  $(document).on("click",".animalBtn", function() {
  // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-name");
    queryGiphy(animal);
    
  });

function queryGiphy(animal){
  // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After data comes back from the request
      .done(function(response) {

        // storing the data from the AJAX request in the results variable
        var results = response.data;
        // Looping through each result item
        $("#gifs-appear-here").empty()
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img class=gif>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("data-state","still");
          //setting data-still attribute and setting the url 
          animalImage.attr("data-still", results[i].images.original_still.url);
          //setting data-animate attribute and setting the url 
          animalImage.attr("data-animate", results[i].images.original.url);
          //setting the still URL 
          animalImage.attr("src", results[i].images.original_still.url);
          // Appending the paragraph and image tag to the animalDiv
          
          animalDiv.append(animalImage);
          animalDiv.append(p);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(animalDiv);
        }
      });
}

$(document).on("click",".gif", function() {

      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var currentState = $(this).attr("data-state")
     // var currentState = $(this).attr("src")

      // ternary
      var newState = (currentState === 'still') ? 'animate' : 'still'
      //copying the state to the imageUrl
      var imageUrl = $(this).attr("data-" + newState)

      $(this).attr("src", imageUrl)

      $(this).attr("data-state", newState)

    })


// This function handles events where one button is clicked
$(".addAnimalBtn").on("click", function(event) {
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var newAnimal = $("#addAnimal").val().trim();

  // The movie from the textbox is then added to our array
  animals.push(newAnimal);
  // clearing the input box after adding the button.
  $('#addAnimal').val('');

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});


