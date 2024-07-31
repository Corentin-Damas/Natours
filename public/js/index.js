// import "@babel/polyfill";
import { login, logout } from "./login";
import { displayMap } from "./mapBox";
import { updateSettings, deleteSetting } from "./updateSettings";
import { bookTour } from "./stripe";

const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const reviewDataForm = document.querySelector(".form-edit-review");
const tourDataForm = document.querySelector(".form-edit-tour");
const userPasswordForm = document.querySelector(".form-user-password");
const bookBtn = document.getElementById("book-tour");
const deleteBtn = document.querySelector(".btn-reviews-delete");

const bookingTourSelected = document.querySelector(".booking-selection");
const bookingLink = document.querySelector(".go-to-booking");

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSettings(form, "data");
  });

if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });

if (reviewDataForm)
  reviewDataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = JSON.parse(reviewDataForm.dataset.id);
    const review = document.getElementById("review").value;
    const rating = document.getElementById("rating").value;

    updateSettings({ id, rating, review }, "review");
    window.setTimeout(() => {
      location.assign("/my-reviews");
    }, 1500);
  });

if (deleteBtn)
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = JSON.parse(deleteBtn.dataset.id);

    deleteSetting(id, "review");
    window.setTimeout(() => {
      location.assign("/my-reviews");
    }, 1000);
  });

if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

if (bookingTourSelected) {
  const preSelection = bookingTourSelected.dataset.tourid;
  bookingTourSelected.addEventListener("click", (e) => {
    e.preventDefault;
    bookingLink.href = `http://127.0.0.1:3000/tour/${preSelection}`;
  });
}

// Manage tour data edit form
if (tourDataForm) {
  document.addEventListener("DOMContentLoaded", function () {
    // Create / Remove new dates, locations for the tour
    const addDateButton = document.getElementById("addDate");
    const addLocationButton = document.getElementById("addLocation");
    const datesSection = document.querySelector(".form-tour-dates");
    const locationsSection = document.querySelector(".form-tour-locations");
    const tourData = JSON.parse(tourDataForm.dataset.tour);
    console.log(tourData);
    let currentIdxDates = tourData.startDates.length;
    let currentIdxLocation = tourData.locations.length;

    // Add event listener to add new DATE input
    addDateButton.addEventListener("click", function () {
      const newDateGroup = document.createElement("div");
      newDateGroup.className = "form__group";
      newDateGroup.innerHTML = `
      <label class="form__label form__label-tour" for="startDates-${currentIdxDates}"> New Date:</label>
      <div class="form__crud" >
      <input  class="form__input-dates" type="datetime-local" id="startDates-${currentIdxDates}" name="startDates-${currentIdxDates}" min="${tourData.calendareData.minDateTime}" max="${tourData.calendareData.maxDateTime}" value="${tourData.calendareData.minDateTime}">
      <button type="button" class="removeDate btn-crud" data-idx="${currentIdxDates}">Remove</button>
      </div>
    `;
      datesSection.appendChild(newDateGroup);
      currentIdxDates++;
    });

    // Add event listener to add new LOCATIONS input
    addLocationButton.addEventListener("click", function () {
      const newLocationDiv = document.createElement("div");
      newLocationDiv.className = "form__group two-col border-bot";
      newLocationDiv.id = `loc-${currentIdxLocation}`;
      newLocationDiv.innerHTML = `        
        <div> 
            <label class="form__label form__label-tour" for="pos-${currentIdxLocation}"> Longitude </label>
            <input class="form__input form__input-tour" type="number" id="pos-${currentIdxLocation}" name="pos-${currentIdxLocation}" value="0")/>
        </div> 
        <div> 
            <label class="form__label form__label-tour" for="lat-${currentIdxLocation}")> Latitude </label>
            <input  class="form__input form__input-tour" type="number" id="lat-${currentIdxLocation}" name="lat-${currentIdxLocation}" value="0")/>
        </div> 
        <div> 
            <label class="form__label form__label-tour" for="addrs-${currentIdxLocation}"> Address </label>
            <input class="form__input form__input-tour" type="text" id="addrs-${currentIdxLocation}" placeholder="Place Address can be empty" name="addrs-${currentIdxLocation}")/>
        </div>
        <div>
            <label class="form__label form__label-tour" for="desciption-${currentIdxLocation}"> Description </label>
            <input class="form__input form__input-tour" type="text" id="desciption-${currentIdxLocation}" placeholder="Place name or small description" name="desciption-${currentIdxLocation}" )/>
        </div> 
        <div> 
            <label class="form__label form__label-tour" for="days-${currentIdxLocation}"> Number of days </label>
            <input class="form__input form__input-tour" type="number" id="days-${currentIdxLocation}" name="days-${currentIdxLocation}" value="1")/>
        </div> 
        <button type="button" class="btn-crud btn-loc removeLocation" id="removeLocation" data-idxloc="${currentIdxLocation}"> Remove Location </button>   
    `;
      locationsSection.appendChild(newLocationDiv);
      currentIdxLocation++;
    });
    // Add event listener to remove LOCATIONS input

    // Add event listener to remove DATE input
    tourDataForm.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("removeDate")) {
        const idx = event.target.getAttribute("data-idx");
        const dateGroup = document
          .getElementById(`startDates-${idx}`)
          .closest(".form__group");
        dateGroup.remove();
        currentIdxDates--;
      } else if (
        event.target &&
        event.target.classList.contains("removeLocation")
      ) {
        console.log("remove loc clicked");
        const idx = event.target.getAttribute("data-idxloc");
        const dateGroup = document
          .getElementById(`loc-${idx}`)
          .closest(".form__group");
        dateGroup.remove();
        currentIdxLocation--;
      }
    });
  });
}
