const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const cardHolder = document.querySelector("#holder");
// Popup
const popup = document.querySelector(".popup")
const popupBody = document.querySelector("#recipe-body")
const popupVideo = document.querySelector("#recipe-video__link")

// Get the input value and start accesAPI func
searchBtn.addEventListener("click", (e) => {
  // Prevent Submiting the form
  e.preventDefault();
  let searchValue = searchInput.value;

  // Call the api and pass the value
  accesApi(searchValue);
  // Clear the field
  cardHolder.innerHTML = ""
});


// Put event listener on getRecipe btn
cardHolder.addEventListener("click", e => {
  if(e.target.className === "card-btn") {
    const thisMealId = e.target.getAttribute("data-id")
    getRecipe(thisMealId)

    // When we click button to open recipe popup we need to give it display flex and show it
    popup.style.display = "flex"
    // And scroll window to the top of the screen
    window.scrollTo(0,0)
    // And last but not least disable body from scrolling
    document.body.classList.add("disabled")
  }
})


// Put event listener to close pop up
popup.addEventListener("click", e => {
  if(e.target.className === "popup-close") {
    // Hide the block if clicked on the button
    e.target.parentNode.parentNode.style.display = "none"
    // Remove the disabled from body
    document.body.classList.remove("disabled")
  }
})


// Fetch API and create elements
function accesApi(searchValue) {
  // Get the data from API
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      // Check if input isn't empty
      if (searchValue != "") {
        data.meals.forEach((meal) => {
          cardHolder.innerHTML +=
          `<div class="card">
          <img src="${meal.strMealThumb}" alt="" id="card-img">
          <div class="card-bottom">
          <h2 id="card-title">${meal.strMeal}</h2>
          <button class="card-btn" id="getRecipeBtn" data-id="${meal.idMeal}">
          Get recipe
          </button>
          </div>
          </div>`;
        });
      }
    })
    .catch(err => console.log(err))

    // Add event on new button
}

// This func gets meals ID as a parameter and then goes inside of it to get further information
function getRecipe(thisMealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${thisMealId}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.meals[0])
    // Now we need to change the pop up info to this API info
    popupBody.innerText = data.meals[0].strInstructions
    popupVideo.setAttribute("href", `${data.meals[0].strYoutube}`)
  })
}


