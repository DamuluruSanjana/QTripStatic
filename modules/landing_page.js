import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url = `${config.backendEndpoint}/cities`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Server is down");
    }
    let cities = await response.json();
    console.log(cities);
    return cities;
  } catch (error) {
    // console.error("Error: ", error.message);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let row = document.getElementById("data");
  let col = document.createElement("div");
  col.className = "col-lg-3 col-sm-6 col-12 mb-4";
  col.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile" >
        <img src="${image}" class="card-img-top" alt="${city}" />
        <div class="tile-text">
            <h5>${city}</h5>
            <p>${description}</p>
        </div>
     </div>
</a>
`;
  row.appendChild(col);
}

export { init, fetchCities, addCityToDOM };
