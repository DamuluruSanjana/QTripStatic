import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let url = `${config.backendEndpoint}/reservations`;
  
  try{
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data= await response.json();
    console.log(data);
    return data;
  }
  catch(error){
    console.error("there was a problem with fetch operation: ",error);
    return null;
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS  
  let banner = document.getElementById("no-reservation-banner");
  let parent = document.getElementById("reservation-table-parent");
  let tableBody= document.getElementById("reservation-table");
  if(reservations.length===0){
    banner.style.display="block";
    parent.style.display="none";
  }
  else{
    banner.style.display="none";
    parent.style.display="block";

    reservations.forEach(reservation => {
      let bookingDate = new Date(reservation.date);
      let bookingTime = new Date(reservation.time);
      let bookingDateFormatted = bookingDate.toLocaleDateString('en-IN');
      let bookingTimeFormatted = bookingTime.toLocaleString('en-IN',{
        year : "numeric",
        month : "long",
        day : "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      }).replace(" at",",");
      let row =` <tr><td><strong>${reservation.id}</strong></td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${bookingDateFormatted}</td>
      <td>${reservation.price}</td>
      <td>${bookingTimeFormatted}</td>
      <td id="${reservation.id}">
      <a href="../detail/?adventure=${reservation.adventure}">
          <button  class="reservation-visit-button">
              Visit Adventure
          </button>
      </a>
      </td></tr>`;
  tableBody.innerHTML+= row;
    });
  }
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
