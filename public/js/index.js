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
const saveTourEditBtn = document.querySelector(".btn-save-edit");
const bookingLink = document.querySelector(".go-to-booking");

const saveUserEdit = document.querySelector(".form--management-users");

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
    const addDateButton = document.getElementById("addDate");
    const addLocationButton = document.getElementById("addLocation");
    const datesSection = document.querySelector(".form-tour-dates");
    const locationsSection = document.querySelector(".form-tour-locations");
    const tourData = JSON.parse(tourDataForm.dataset.tour);
    let currentIdxDates = tourData.startDates.length;
    let currentIdxLocation = tourData.locations.length;

    //  ADD new DATE input
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

    // ADD new LOCATIONS input
    addLocationButton.addEventListener("click", function () {
      const newLocationDiv = document.createElement("div");
      newLocationDiv.className = "form__group two-col border-bot";
      newLocationDiv.id = `loc-${currentIdxLocation}`;
      newLocationDiv.dataset.tourLocation = "";
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

    //  REMOVE: DATE, LOCATION
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
        const idx = event.target.getAttribute("data-idxloc");
        const dateGroup = document
          .getElementById(`loc-${idx}`)
          .closest(".form__group");
        dateGroup.remove();
        currentIdxLocation--;
      }
    });

    // PATCH the tour
    saveTourEditBtn.addEventListener("click", (e) => {
      // Collect all the data
      const id = tourData.id;
      const name = document.getElementById("mainTitle").value;
      const slug = name.toLowerCase().split(" ").join("-");
      const duration = document.getElementById("duration").value;
      const difficulty = document.getElementById("difficulty").value;
      const price = document.getElementById("price").value;
      const maxGroupSize = document.getElementById("groupeSize").value;
      const imageCover = document.getElementById("coverImg").value;
      const summary = document.getElementById("summary").value;
      const description = document.getElementById("description").value;

      const tourImgInputs = document.querySelectorAll("input[data-tour-img]");
      const images = Array.from(tourImgInputs).map((input) => input.value);

      const tourGuidesInputs = document.querySelectorAll(
        "input[data-tour-guide]"
      );
      const guides = Array.from(tourGuidesInputs)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id);

      const tourDatesInputs = document.querySelectorAll(
        "input[data-tour-date]"
      );
      const startDates = Array.from(tourDatesInputs).map(
        (input) => input.value
      );

      // startLocation missing here
      const startingLocationGroup = document.getElementById("startingLocation");
      const startLocation = {
        type: "Point",
        coordinates: [
          startingLocationGroup.querySelector('input[name="StartingPosLong"]')
            .value,
          startingLocationGroup.querySelector('input[name="StartingPosLat"]')
            .value,
        ],
        address: startingLocationGroup.querySelector(
          'input[name="StartingPosAddrs"]'
        ).value,
        description: startingLocationGroup.querySelector(
          'input[name="StartingPosdesc"]'
        ).value,
      };

      const tourLocationGroups = document.querySelectorAll(
        "[data-tour-location]"
      );
      const locations = Array.from(tourLocationGroups).map((group) => {
        return {
          type: "Point",
          coordinates: [
            group.querySelector('input[name^="pos-"]').value,
            group.querySelector('input[name^="lat-"]').value,
          ],

          description: group.querySelector('input[name^="desciption-"]').value,
          day: group.querySelector('input[name^="days-"]').value,
        };
      });
      // Send the API adress PATCH
      updateSettings(
        {
          id,
          name,
          slug,
          duration,
          difficulty,
          price,
          maxGroupSize,
          imageCover,
          summary,
          description,
          images,
          guides,
          startDates,
          startLocation,
          locations,
        },
        "tour"
      );
    });
  }); // Dom Ready Event listner
}

const allUserSaveForm = document.querySelectorAll(".card-management-user");
if (saveUserEdit)
  allUserSaveForm.forEach((btn) => {
    btn.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = btn.id;
      const name = btn.querySelector('input[name^="name-"]').value;
      const email = btn.querySelector('input[name^="email-"]').value;
      const role = btn.querySelector('select[name^="role-"]').value;

      updateSettings({ id, name, email, role }, "userEdit");
    });
  });

const reviewManagement = document.querySelector(".form--management-reviews");
const allReviewDelete = document.querySelectorAll(".card-management-review");
if (reviewManagement) {
  allReviewDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteSetting(btn.id, "userEdit");
      window.setTimeout(() => {
        location.assign("/manage-reviews");
      }, 500);
    });
  });
}
