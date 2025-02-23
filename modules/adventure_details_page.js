
import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let arr = search.split("=");
  console.log(arr[1]);
  return arr[1];


}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Server is down");
    }
    let adventureDeatail = await response.json();
    console.log(adventureDeatail);
    return adventureDeatail;
  } catch (error) {
    console.error("Error: ", error.message);
    return null;
  }


}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let adventureName = document.getElementById("adventure-name");
  adventureName.textContent = `${adventure.name}`;

  let adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.textContent = `${adventure.subtitle}`;

  let photoGallery = document.getElementById("photo-gallery");
  adventure.images.forEach((image) => {
    let img = document.createElement("img");
    let div = document.createElement("div");
    img.src = image;
    img.className = "activity-card-image";
    div.append(img);
    photoGallery.append(div);
  })

  let adventureContent = document.getElementById("adventure-content");
  adventureContent.textContent = `${adventure.content}`



}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";
  let carousel = document.createElement("div");
  carousel.className = "carousel slide";
  carousel.setAttribute("data-bs-ride", "carousel");
  carousel.id = "carouselExampleIndicators";

  let carouselIndicators = document.createElement("div");
  carouselIndicators.className = "carousel-indicators";
  carouselIndicators.innerHTML = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>`;

  carousel.append(carouselIndicators);


  let carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  carousel.append(carouselInner);
  photoGallery.append(carousel);


  images.forEach((image, index) => {
    let img = document.createElement("img");
    let carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item ";
    if (index == 0) {
      carouselItem.classList.add("active");
    }
    img.src = image;
    img.className = "activity-card-image";
    carouselItem.append(img);
    carouselInner.append(carouselItem);
  })

  let carouselControlPrev = document.createElement("button");
  carouselControlPrev.className = "carousel-control-prev";
  carouselControlPrev.type = "button";
  carouselControlPrev.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlPrev.setAttribute("data-bs-slide", "prev");
  carouselControlPrev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>`;
  let carouselControlNext = document.createElement("button");
  carouselControlNext.className = "carousel-control-next";
  carouselControlNext.type = "button";
  carouselControlNext.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlNext.setAttribute("data-bs-slide", "next");
  carouselControlNext.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>`;
  carousel.append(carouselControlPrev);
  carousel.append(carouselControlNext);


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  let soldOut = document.getElementById("reservation-panel-sold-out");
  let reservation = document.getElementById("reservation-panel-available");
  let cost = document.getElementById("reservation-person-cost");
  cost.textContent = `${adventure.costPerHead}`;

  if (adventure.available) {

    soldOut.style.display = "none";
    reservation.style.display = "block";
  }
  else {
    soldOut.style.display = "block";
    reservation.style.display = "none";
  }
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = document.getElementById("reservation-cost");
  reservationCost.textContent = `${adventure.costPerHead * persons}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  let url = `${config.backendEndpoint}/reservations/new`;


  const form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    var data = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id,
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((json) => {
        console.log(json);
        // 2. If the reservation is successful, show an alert with "Success!" and refresh the page.
        alert("Success!");
        location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // If the reservation fails, just show an alert with "Failed!".
        alert("Failed!");
      });
  })

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  let banner = document.getElementById("reserved-banner");
  // If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
