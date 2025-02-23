
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  let city = params.get('city')

return city


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    const response= await fetch(`${config.backendEndpoint}/adventures?city=${city}`)    
    const data = await response.json()
    return data;
  } catch (error) {
    return null;
  }

}

function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let card =  document.getElementById("data");
  adventures.forEach(element => {
    let data = document.createElement("div")
    data.className = "col-6 col-md-4 col-lg-3 mb-4  "
    data.innerHTML = `<a  class= "link" href = "detail/?adventure=${element.id}" id= ${element.id} >
                      <div class="card activity-card">
                      <p class = "category-banner">${element.category}</p>
                      <img class = "
                      " src= ${element.image} />


                     <div class=" details-section ">
                     <div class="details-price ">
                     <h5 class="" >${element.name}</h5>
                     <span class="">${element.costPerHead}</span>
                     </div>

                     
                     <div class="details-price ">
                     <h5 class="" >Duration</h5>
                     <span class="">${element.duration} Hours</span>
                     </div>
                     </div>
                    </div>
                     </a>
                     
                      `
    card.appendChild(data)
    
  });
 

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredArray = list.filter((ele)=>{
    if(ele.duration >low && ele.duration <=high){
      return ele;
    }
  })
  return filteredArray;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(categoryList)

  let filteredByCategory = list.filter((ele)=>{
    if(categoryList.includes(ele.category)){
      return ele;
    }
  })

  // console.log(filteredByCategory)
  return filteredByCategory

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters)


  // if(filters.category.length===0){
  //   return list

  // } 
  if(filters.duration !='' || filters.category.length>0){
    var filteredByDuration = filterByDuration(list, filters.duration.split("-")[0] , filters.duration.split("-")[1])
    var filterdArray = filterByCategory(filteredByDuration,filters.category)

  }
  if(filters.duration!=='' && filters.category.length==0){
    var filterdArray = filterByDuration(list, filters.duration.split("-")[0] , filters.duration.split("-")[1])
  }
  else if(filters.category.length===0){
    return list
  } 
    if(filters.duration ==='' && filters.category.length>0){
      var filterdArray = filterByCategory(list,filters.category)

    }
  
  return filterdArray


  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters" , JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let storedFilteredArray = localStorage.getItem("filters")
  return JSON.parse(storedFilteredArray)


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let container = document.getElementById("category-section");
  let section   = document.createElement("div");
  section.setAttribute("id" , "category-list")
  let innerHtml = ""

  filters.category.forEach((e)=>{
    container.innerHTML=""
     innerHtml+=`<span class="category-filter" >${e}</span>`
     console.log(innerHtml)

  })
  console.log(filters.category.length)

  section.innerHTML = innerHtml
    container.appendChild(section);

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
